package lt.techin.ejuraityte.order;

import lt.techin.ejuraityte.meal.Meal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/ordering") //room
public class OrderController {

    @Autowired
    private final OrderService orderService;


    public OrderController(OrderService orderService){

        this.orderService = orderService;
    }

    @GetMapping
    public List<Ordering> getAll(){
        return orderService.getAllOrders();
    }

    @PostMapping
    public ResponseEntity<Ordering> createOrder(@RequestBody @Valid OrderRequestDTO orderRequest) {

        Ordering createdOrder = orderService.createOrder(orderRequest);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Optional<Ordering> getById(@PathVariable Long id) {
        return orderService.getById(id);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Ordering> edit(@PathVariable Long id,
                                              @Valid @RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.edit(id, OrderMapper.toOrder(orderDto)));
    }

    @PatchMapping("/confirm/{id}")
    public ResponseEntity<Ordering> confirm(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.confirm(id));
    }

    @PatchMapping("/cancel/{id}")
    public ResponseEntity<Ordering> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.cancel(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
