package lt.techin.ejuraityte.meal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static lt.techin.ejuraityte.meal.MealMapper.toMeal;
import static lt.techin.ejuraityte.meal.MealMapper.toMealDto;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/v1/meals") //Subject

public class MealController {

    @Autowired
    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping
    public List<Meal> getAll() {
        return mealService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Meal> getById(@PathVariable Long id) {
        return mealService.getById(id);
    }

    @PostMapping
    public ResponseEntity<MealDto> create(@RequestBody MealDto mealDto) {

        return ok(toMealDto(mealService.create(toMeal(mealDto))));
    }


    @PatchMapping("/edit/{id}")
    public ResponseEntity<Meal> edit(@PathVariable Long id,
                                     @RequestBody MealDto mealDto) {

        return ok(mealService.edit(id, toMeal(mealDto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mealService.delete(id);
        return ResponseEntity.noContent().build();
    }

//    @PatchMapping("/delete/{id}")
//    public ResponseEntity<Meal> delete(@PathVariable Long id) {
//
//        return ok(mealService.delete(id));
//    }
//
//    @PatchMapping("/restore/{id}")
//    public ResponseEntity<Meal> restore(@PathVariable Long id) {
//
//        return ok(mealService.restore(id));
//
//    }
}