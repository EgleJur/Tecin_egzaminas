package lt.techin.ejuraityte.workerRating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/worker-ratings")
public class WorkerRatingController {
    private final WorkerRatingService workerRatingService;

    @Autowired
    public WorkerRatingController(WorkerRatingService workerRatingService) {
        this.workerRatingService = workerRatingService;
    }

    @GetMapping
    public ResponseEntity<List<WorkerRating>> getAllWorkerRatings() {
        List<WorkerRating> workerRatings = workerRatingService.getAllWorkerRatings();
        return new ResponseEntity<>(workerRatings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkerRating> getWorkerRatingById(@PathVariable("id") Long id) {
        Optional<WorkerRating> workerRating = workerRatingService.getWorkerRatingById(id);
        return workerRating.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<WorkerRating> createWorkerRating(@RequestBody WorkerRating workerRating) {
        WorkerRating createdWorkerRating = workerRatingService.createWorkerRating(workerRating);
        return new ResponseEntity<>(createdWorkerRating, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkerRating> updateWorkerRating(@PathVariable("id") Long id, @RequestBody WorkerRating updatedWorkerRating) {
        WorkerRating workerRating = workerRatingService.updateWorkerRating(id, updatedWorkerRating);
        if (workerRating != null) {
            return new ResponseEntity<>(workerRating, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkerRating(@PathVariable("id") Long id) {
        workerRatingService.deleteWorkerRating(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
