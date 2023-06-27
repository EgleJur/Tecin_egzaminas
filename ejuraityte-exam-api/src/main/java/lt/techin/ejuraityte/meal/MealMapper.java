package lt.techin.ejuraityte.meal;

public class MealMapper {

    public static Meal toMeal(MealDto mealDto) {

        Meal meal = new Meal();

        meal.setName(mealDto.getName());
        meal.setDescription(mealDto.getDescription());

        return meal;
    }

    public static MealDto toMealDto(Meal meal) {

        MealDto mealDto = new MealDto();

        mealDto.setName(meal.getName());
        mealDto.setDescription(meal.getDescription());

        return mealDto;
    }


}