package lt.techin.ejuraityte.order;

import lombok.Data;
import lt.techin.ejuraityte.meal.MealItemDTO;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class OrderRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String clientName;

    @NotNull
    @Valid
    private List<MealItemDTO> meals;

    private boolean confirmed;
}
