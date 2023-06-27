package lt.techin.ejuraityte.validationUnits;

import lt.techin.ejuraityte.exception.ValidationException;
import lt.techin.ejuraityte.meal.Meal;
import lt.techin.ejuraityte.meal.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;


public class MealUtils {

    @Autowired
    MealRepository mealRepository;

    public MealUtils(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    public Meal getMealById(Long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Meal does not exist", "id",
                        "Meal not found", String.valueOf(id)));
    }

    public boolean existsByName(String name) {
        return mealRepository.existsByNameIgnoreCase(name);
    }

    public void checkMealNameUnique(String name) {
        if (existsByName(name)) {
            throw new ValidationException("Meal name must be unique",
                    "name", "Name already exists", name);
        }
    }
}
