package lt.techin.ejuraityte.workerRating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerRatingService {
    private final WorkerRatingRepository workerRatingRepository;

    @Autowired
    public WorkerRatingService(WorkerRatingRepository workerRatingRepository) {
        this.workerRatingRepository = workerRatingRepository;
    }

    public List<WorkerRating> getAllWorkerRatings() {
        return workerRatingRepository.findAll();
    }

    public Optional<WorkerRating> getWorkerRatingById(Long id) {
        return workerRatingRepository.findById(id);
    }

    public WorkerRating createWorkerRating(WorkerRating workerRating) {
        return workerRatingRepository.save(workerRating);
    }

    public WorkerRating updateWorkerRating(Long id, WorkerRating updatedWorkerRating) {
        Optional<WorkerRating> existingWorkerRating = workerRatingRepository.findById(id);
        if (existingWorkerRating.isPresent()) {
            WorkerRating workerRating = existingWorkerRating.get();
            workerRating.setWorker(updatedWorkerRating.getWorker());
            workerRating.setRating(updatedWorkerRating.getRating());
            return workerRatingRepository.save(workerRating);
        }
        return null;
    }

    public void deleteWorkerRating(Long id) {
        workerRatingRepository.deleteById(id);
    }
}
