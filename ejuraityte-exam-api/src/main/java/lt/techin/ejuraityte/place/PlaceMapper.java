package lt.techin.ejuraityte.place;

public class PlaceMapper {

    public static Place toPlace(PlaceDto placeDto) {
        Place place = new Place();
        place.setName(placeDto.getName());
        place.setAddress(placeDto.getAddress());
        place.setManager(placeDto.getManager());
        return place;
    }

    public static PlaceDto toPlaceDto(Place place) {
        PlaceDto placeDto = new PlaceDto();
        placeDto.setName(place.getName());
        placeDto.setAddress(place.getAddress());
        placeDto.setManager(place.getManager());
        return placeDto;
    }
}
