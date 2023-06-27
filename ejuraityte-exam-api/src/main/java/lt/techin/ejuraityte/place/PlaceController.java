package lt.techin.ejuraityte.place;

import lt.techin.ejuraityte.meal.Meal;
import lt.techin.ejuraityte.meal.MealDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static lt.techin.ejuraityte.meal.MealMapper.toMeal;
import static lt.techin.ejuraityte.meal.MealMapper.toMealDto;
import static lt.techin.ejuraityte.place.PlaceMapper.toPlace;
import static lt.techin.ejuraityte.place.PlaceMapper.toPlaceDto;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/v1/places")
public class PlaceController {
    private final PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping
    public List<Place> getAll() {
        return placeService.getAllPlaces();
    }

    @GetMapping("/{id}")
    public Optional<Place> getPlaceById(@PathVariable Long id) {
        return placeService.getPlaceById(id);
    }

//    @PostMapping
//    public ResponseEntity<Place> createPlace(@RequestBody Place place) {
//        Place createdPlace = placeService.createPlace(place);
//        return new ResponseEntity<>(createdPlace, HttpStatus.CREATED);
//    }
    @PostMapping
    public ResponseEntity<PlaceDto> createPlace(@RequestBody PlaceDto placeDto) {

        return ok(toPlaceDto(placeService.createPlace(toPlace(placeDto))));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Place> updatePlace(@PathVariable("id") Long id, @RequestBody Place updatedPlace) {
//        Place place = placeService.updatePlace(id, updatedPlace);
//        if (place != null) {
//            return new ResponseEntity<>(place, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
    @PatchMapping("/edit/{id}")
    public ResponseEntity<Place> edit(@PathVariable Long id,
                                     @RequestBody PlaceDto placeDto) {

        return ok(placeService.edit(id, toPlace(placeDto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable("id") Long id) {
        placeService.deletePlace(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
