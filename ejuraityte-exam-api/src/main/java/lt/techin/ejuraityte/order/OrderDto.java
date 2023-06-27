package lt.techin.ejuraityte.order;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.meal.Meal;
import lt.techin.ejuraityte.orderingMeals.OrderingMeals;
import org.apache.catalina.LifecycleState;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {

    private String name;
    private String client_name;
    private List<OrderingMeals> orderedMeals;

//    private boolean deleted;


    public OrderDto(String name) {
        this.orderedMeals = new ArrayList<>();
        this.name = name;
    }

}
