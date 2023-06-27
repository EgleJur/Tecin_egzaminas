//package lt.techin.ejuraityte.validationUnits;
//
//import lt.techin.ejuraityte.exception.ValidationException;
//import lt.techin.ejuraityte.order.Ordering;
//import lt.techin.ejuraityte.order.OrderRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//
//
//public class OrderUtils {
//
//    @Autowired
//    private final OrderRepository orderRepository;
//
//    public OrderUtils(OrderRepository orderRepository) {
//
//        this.orderRepository = orderRepository;
//    }
//
//    public Ordering getOrderById(Long id) {
//        return orderRepository.findById(id)
//                .orElseThrow(() -> new ValidationException("Order does not exist", "id",
//                        "Order not found", String.valueOf(id)));
//    }
//
//    public boolean existsByName(String name) {
//
//        return orderRepository.existsByNameIgnoreCase(name);
//    }
//
//    public void checkOrderNameUnique(String name) {
//        if (existsByName(name)) {
//            throw new ValidationException("Order name must be unique", "name", "Name already exists", name);
//        }
//    }
//}
