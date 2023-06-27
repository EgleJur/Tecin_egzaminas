package lt.techin.ejuraityte.order;

import lt.techin.ejuraityte.meal.Meal;
import lt.techin.ejuraityte.meal.MealItemDTO;
import lt.techin.ejuraityte.meal.MealRepository;
import lt.techin.ejuraityte.orderingMeals.OrderingMealRepository;
import lt.techin.ejuraityte.orderingMeals.OrderingMealService;
import lt.techin.ejuraityte.orderingMeals.OrderingMeals;
import lt.techin.ejuraityte.validationUnits.MealUtils;
import lt.techin.ejuraityte.validationUnits.OrderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static lt.techin.ejuraityte.validationUnits.ValidationUtilsNotNull.isValidByName;

@Service
public class OrderService {

    private final OrderingMealRepository orderingMealRepository;
    private final MealRepository mealRepository;
    @Autowired
    OrderRepository orderRepository;

    private final OrderingMealService orderingMealService;

    OrderUtils orderUtils;
    MealUtils mealUtils;

    public OrderService(OrderRepository orderRepository,
                        OrderingMealService orderingMealService,
                        MealRepository mealRepository,
                        OrderingMealRepository orderingMealRepository, MealRepository mealRepository1) {

        this.orderRepository = orderRepository;
        this.orderingMealService = orderingMealService;
        orderUtils = new OrderUtils(orderRepository);
        mealUtils = new MealUtils(mealRepository);
        this.orderingMealRepository = orderingMealRepository;
        this.mealRepository = mealRepository1;
    }

    public List<Ordering> getAllOrders() {

        return orderRepository.findAllByOrderByConfirmedAsc();
    }

    public Ordering createOrder(OrderRequestDTO orderRequest) {
        Ordering ordering = new Ordering();
        ordering.setName(orderRequest.getName());
        ordering.setClient_name(orderRequest.getClientName());
        ordering.setConfirmed(orderRequest.isConfirmed());

        List<MealItemDTO> mealItems = orderRequest.getMeals();
        for (MealItemDTO mealItem : mealItems) {
            Meal meal = mealRepository.findById(mealItem.getMeal_id())
                .orElseThrow(() -> new IllegalArgumentException("Invalid meal ID: " + mealItem.getMeal_id()));

            OrderingMeals orderingMeals = new OrderingMeals();
            orderingMeals.setMeal(meal);
            orderingMeals.setQuantity(mealItem.getQuantity());
            orderingMeals.setOrdering(ordering);

            ordering.addMeal(orderingMeals);
        }

        return orderRepository.save(ordering);
    }

    public Optional<Ordering> getById(Long id) {

        return orderRepository.findById(id);
    }

    public Ordering edit(Long id, Ordering order) {
        isValidByName(order.getName());
        Ordering existingOrder = orderUtils.getOrderById(id);

        if (!existingOrder.getName().equals(order.getName())) {
            orderUtils.checkOrderNameUnique(order.getName());
            existingOrder.setName(order.getName());
        }
        if (!existingOrder.getClient_name().equals(order.getClient_name())) {
            existingOrder.setClient_name(order.getClient_name());
        }

        // Update ordered meals
        List<OrderingMeals> orderedMeals = order.getOrderedMeals();
        List<OrderingMeals> existingOrderedMeals = existingOrder.getOrderedMeals();

        // Remove deleted meals and update quantities
        Iterator<OrderingMeals> iterator = existingOrderedMeals.iterator();
        while (iterator.hasNext()) {
            OrderingMeals existingMeal = iterator.next();
            OrderingMeals matchingMeal = findMatchingMeal(orderedMeals, existingMeal);
            if (matchingMeal == null) {
                iterator.remove();
                // Delete the OrderingMeals entity from the database
                orderingMealService.deleteOrderingMeal(existingMeal.getId());
            } else {
                existingMeal.setQuantity(matchingMeal.getQuantity()); // Update the quantity
            }
        }

        // Add new meals and update quantities
        for (OrderingMeals meal : orderedMeals) {
            OrderingMeals matchingMeal = findMatchingMeal(existingOrderedMeals, meal);
            if (matchingMeal == null) {
                meal.setOrdering(existingOrder);
                existingOrderedMeals.add(meal);
            } else {
                matchingMeal.setQuantity(meal.getQuantity()); // Update the quantity
            }
        }

        return orderRepository.save(existingOrder);
    }
//    public Ordering edit(Long id, Ordering order) {
//        isValidByName(order.getName());
//        Ordering existingOrder = orderUtils.getOrderById(id);
//
//        if (!existingOrder.getName().equals(order.getName())) {
//            orderUtils.checkOrderNameUnique(order.getName());
//            existingOrder.setName(order.getName());
//        }
//
//
//        // Update ordered meals
//        List<OrderingMeals> orderedMeals = order.getOrderedMeals();
//        List<OrderingMeals> existingOrderedMeals = existingOrder.getOrderedMeals();
//
//        // Remove deleted meals
//        Iterator<OrderingMeals> iterator = existingOrderedMeals.iterator();
//        while (iterator.hasNext()) {
//            OrderingMeals existingMeal = iterator.next();
//            OrderingMeals matchingMeal = findMatchingMeal(orderedMeals, existingMeal);
//            if (matchingMeal == null) {
//                iterator.remove();
//                // Delete the OrderingMeals entity from the database
//                orderingMealService.deleteOrderingMeal(existingMeal.getId());
//            }
//        }
//
//        // Add new meals
//        for (OrderingMeals meal : orderedMeals) {
//            OrderingMeals matchingMeal = findMatchingMeal(existingOrderedMeals, meal);
//            if (matchingMeal == null) {
//                meal.setOrdering(existingOrder);
//                existingOrderedMeals.add(meal);
//            }
//        }
//
//        return orderRepository.save(existingOrder);
//    }


    private OrderingMeals findMatchingMeal(List<OrderingMeals> meals, OrderingMeals targetMeal) {
        for (OrderingMeals meal : meals) {
            if (meal.getMeal().getMeal_id().equals(targetMeal.getMeal().getMeal_id())) {
                return meal;
            }
        }
        return null;
    }

    private OrderingMeals findExistingMeal(List<OrderingMeals> existingMeals, Long mealId) {
        for (OrderingMeals meal : existingMeals) {
            if (meal.getMeal().getMeal_id().equals(mealId)) {
                return meal;
            }
        }
        return null;
    }

    public Ordering confirm(Long id) {

        Ordering existingMenu = orderUtils.getOrderById(id);

        existingMenu.setConfirmed(true);
        return orderRepository.save(existingMenu);
    }

    public Ordering cancel(Long id) {

       Ordering existingMenu = orderUtils.getOrderById(id);

        existingMenu.setConfirmed(false);
        return orderRepository.save(existingMenu);
    }

    public void delete(Long id) {
        Ordering existingOrder = orderUtils.getOrderById(id);
        //Optional<Ordering> optionalOrder = orderRepository.findById(id);
            orderingMealService.deleteOrderingMealsByOrder(existingOrder);
            orderRepository.deleteById(id);

    }
}
