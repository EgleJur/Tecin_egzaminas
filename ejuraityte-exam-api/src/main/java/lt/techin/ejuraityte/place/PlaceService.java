package lt.techin.ejuraityte.place;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static lt.techin.ejuraityte.validationUnits.ValidationUtilsNotNull.isValidByName;

@Service
public class PlaceService {
    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Optional<Place> getPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }


    public Place edit(Long id, Place updatedPlace) {

//        isValidByName(meal.getName());
        Optional<Place> existingPlace = placeRepository.findById(id);
        if (existingPlace.isPresent()) {
            Place place = existingPlace.get();
            place.setName(updatedPlace.getName());
            place.setAddress(updatedPlace.getAddress());
            place.setManager(updatedPlace.getManager());
            return placeRepository.save(place);
        }
        return null;
    }

    public void deletePlace(Long id) {

        placeRepository.deleteById(id);
    }
}
