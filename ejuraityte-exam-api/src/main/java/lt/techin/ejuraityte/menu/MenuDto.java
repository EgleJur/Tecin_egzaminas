package lt.techin.ejuraityte.menu;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.meal.Meal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuDto {

    private String name;
    private Set<Meal> meal;


}
