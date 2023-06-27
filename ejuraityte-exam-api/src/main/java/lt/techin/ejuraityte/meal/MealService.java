package lt.techin.ejuraityte.meal;

import lt.techin.ejuraityte.validationUnits.MealUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static lt.techin.ejuraityte.validationUnits.ValidationUtilsNotNull.isValidByName;


@Service
public class MealService {

    @Autowired
    private final MealRepository mealRepository;

    private final MealUtils mealUtils;


    public MealService(MealRepository mealRepository) {
        this.mealRepository = mealRepository;

        mealUtils = new MealUtils(mealRepository);

    }

        public List<Meal> getAll() {
        return mealRepository.findAll();
    }


    public Optional<Meal> getById(Long id) {
        return mealRepository.findById(id);
    }

    public Meal create(Meal meal) {

        isValidByName(meal.getName());
        mealUtils.checkMealNameUnique(meal.getName());

        return mealRepository.save(meal);
    }

    public Meal edit(Long mealId, Meal meal) {

        isValidByName(meal.getName());
        Meal updatedMeal = mealUtils.getMealById(mealId);
        if(!updatedMeal.getName().equals(meal.getName())) {
            mealUtils.checkMealNameUnique(meal.getName());
        }

        updatedMeal.setName(meal.getName());
        updatedMeal.setDescription(meal.getDescription());
        return mealRepository.save(updatedMeal);
    }

//    public Meal delete(Long mealId) {
//
//        Meal existingMeal = mealUtils.getMealById(mealId);
//        if (!existingMeal.isDeleted()) {
//            existingMeal.setDeleted(true);
//            return mealRepository.save(existingMeal);
//        } else {
//            return existingMeal;
//        }
//
//    }
//
//    public Meal restore(Long id) {
//        var existingMeal = mealUtils.getMealById(id);
//
//        if (existingMeal.isDeleted()) {
//            existingMeal.setDeleted(false);
//            return mealRepository.save(existingMeal);
//        } else {
//            return existingMeal;
//        }
//    }

    public void delete(Long id) {
        mealRepository.deleteById(id);
    }

}