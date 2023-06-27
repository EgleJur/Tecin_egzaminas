package lt.techin.ejuraityte.place;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping
    public ResponseEntity<PlaceDto> createPlace(@RequestBody PlaceDto placeDto) {

        return ok(toPlaceDto(placeService.createPlace(toPlace(placeDto))));
    }

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
