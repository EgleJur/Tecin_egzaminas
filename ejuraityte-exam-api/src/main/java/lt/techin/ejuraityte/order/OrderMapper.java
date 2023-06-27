package lt.techin.ejuraityte.order;

public class OrderMapper {

    public static Ordering toOrder(OrderDto orderDto) {

        Ordering ordering = new Ordering();
        ordering.setName(orderDto.getName());
        ordering.setClient_name(orderDto.getClient_name());
        ordering.setOrderedMeals(orderDto.getOrderedMeals());
        return ordering;
    }

    public static OrderDto toOrderDto(Ordering ordering){

        OrderDto orderDto = new OrderDto();
        orderDto.setName(ordering.getName());
        orderDto.setClient_name(ordering.getClient_name());
        orderDto.setOrderedMeals(ordering.getOrderedMeals());
        return orderDto;
    }
}
