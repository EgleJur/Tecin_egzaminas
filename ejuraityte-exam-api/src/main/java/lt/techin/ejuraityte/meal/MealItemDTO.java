package lt.techin.ejuraityte.meal;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class MealItemDTO {

    @NotNull
    private Long meal_id;

    @Min(1)
    private int quantity;
}
