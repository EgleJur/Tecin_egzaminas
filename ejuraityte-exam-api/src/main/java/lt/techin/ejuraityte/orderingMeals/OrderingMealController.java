package lt.techin.ejuraityte.orderingMeals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/ordering-meals")
public class OrderingMealController {

    private final OrderingMealService orderingMealService;

    @Autowired
    public OrderingMealController(OrderingMealService orderingMealService) {
        this.orderingMealService = orderingMealService;
    }

    @PostMapping
    public ResponseEntity<List<OrderingMeals>> createOrderingMeals(@RequestBody List<OrderingMeals> orderingMeals) {
       return ResponseEntity.ok(orderingMealService.createOrderingMeal(orderingMeals));
    }

    @GetMapping
    public List<OrderingMeals> getAllOrderingMeals() {
        return orderingMealService.getAllOrderingMeals();
    }

    @GetMapping("/{id}")
    public Optional<OrderingMeals> getOrderingMealById(@PathVariable Long id) {
        return orderingMealService.getOrderingMealById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderingMeals> updateOrderingMeal(@PathVariable Long id,
                                                            @RequestBody OrderingMeals orderingMeals) {
        orderingMeals.setId(id);
        return ResponseEntity.ok(orderingMealService.updateOrderingMeal(orderingMeals));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderingMeal(@PathVariable Long id) {
        orderingMealService.deleteOrderingMeal(id);
        return ResponseEntity.noContent().build();
    }
}
