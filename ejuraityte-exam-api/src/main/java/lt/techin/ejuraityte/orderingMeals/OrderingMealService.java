package lt.techin.ejuraityte.orderingMeals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.techin.ejuraityte.order.Ordering;

@Service
public class OrderingMealService {

    private final OrderingMealRepository orderingMealRepository;

    @Autowired
    public OrderingMealService(OrderingMealRepository orderingMealRepository) {
        this.orderingMealRepository = orderingMealRepository;
    }

    public List<OrderingMeals> createOrderingMeal(List<OrderingMeals> orderingMeals) {
        List<OrderingMeals> savedOrderingMeals = new ArrayList<>();
        for (OrderingMeals orderingMeal : orderingMeals) {
            Integer quantity = orderingMeal.getQuantity();
            if (quantity != null && quantity != 0) {
                savedOrderingMeals.add(orderingMealRepository.save(orderingMeal));
            }
        }
        return savedOrderingMeals;
    }

    public List<OrderingMeals> getAllOrderingMeals() {
        return orderingMealRepository.findAll();
    }

    public Optional<OrderingMeals> getOrderingMealById(Long id) {
        return orderingMealRepository.findById(id);
           }

    public OrderingMeals updateOrderingMeal(OrderingMeals orderingMeals) {
        return orderingMealRepository.save(orderingMeals);
    }

    public void deleteOrderingMeal(Long id) {
        orderingMealRepository.deleteById(id);
    }

    public void deleteOrderingMealsByOrder(Ordering order) {
        List<OrderingMeals> orderingMeals = orderingMealRepository.findByOrdering(order);
        orderingMealRepository.deleteAll(orderingMeals);
    }
}
