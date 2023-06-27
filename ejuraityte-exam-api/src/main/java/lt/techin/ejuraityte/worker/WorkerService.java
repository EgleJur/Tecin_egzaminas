package lt.techin.ejuraityte.worker;

import lt.techin.ejuraityte.exception.ValidationException;
import lt.techin.ejuraityte.place.Place;
import lt.techin.ejuraityte.place.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {
    private final WorkerRepository workerRepository;
    private final PlaceRepository placeRepository;

    @Autowired
    public WorkerService(WorkerRepository workerRepository,
                         PlaceRepository placeRepository) {
        this.workerRepository = workerRepository;
        this.placeRepository = placeRepository;
    }

    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    public Optional<Worker> getWorkerById(Long id) {
        return workerRepository.findById(id);
    }

    public Worker createWorker(Worker worker, Long place_id) {
        Place newPlace = placeRepository.findById(place_id)
                .orElseThrow(() -> new ValidationException("place does not exist", "id",
                        "place not found", String.valueOf(place_id)));
        worker.setPlace(newPlace);
        return workerRepository.save(worker);
    }

    public Worker edit(Long id, Worker updatedWorker, Long place_id) {

//        isValidByName(meal.getName());
        Place newPlace = placeRepository.findById(place_id)
                .orElseThrow(() -> new ValidationException("place does not exist", "id",
                        "place not found", String.valueOf(place_id)));

        Optional<Worker> existingWorker = workerRepository.findById(id);
        if (existingWorker.isPresent()) {
            Worker worker = existingWorker.get();
            worker.setName(updatedWorker.getName());
            worker.setSurname(updatedWorker.getSurname());
            worker.setSpeciality(updatedWorker.getSpeciality());
            worker.setCity(updatedWorker.getCity());
//            Optional<Place>  newPlace = placeRepository.findById(place_id);
            worker.setPlace(newPlace);
            return workerRepository.save(worker);
        }
        return null;
    }

    public void deleteWorker(Long id) {
        workerRepository.deleteById(id);
    }
}


