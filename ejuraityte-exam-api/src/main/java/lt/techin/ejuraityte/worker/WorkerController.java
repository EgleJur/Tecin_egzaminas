package lt.techin.ejuraityte.worker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static lt.techin.ejuraityte.worker.WorkerMapper.toWorker;
import static lt.techin.ejuraityte.worker.WorkerMapper.toWorkerDto;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/v1/workers")
public class WorkerController {
    private final WorkerService workerService;

    @Autowired
    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping
    public List<Worker> getAll() {
        return workerService.getAllWorkers();
    }

    @GetMapping("/{id}")
    public Optional<Worker> getWorkerById(@PathVariable Long id) {
        return workerService.getWorkerById(id);
    }

    @PostMapping
    public ResponseEntity<WorkerDto> createWorker(@RequestBody WorkerDto placeDto, @RequestParam Long place_id ) {

        return ok(toWorkerDto(workerService.createWorker(toWorker(placeDto), place_id)));
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Worker> edit(@PathVariable Long id,
                                      @RequestBody WorkerDto workerDto, @RequestParam Long place_id ) {


        return ok(workerService.edit(id, toWorker(workerDto), place_id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorker(@PathVariable("id") Long id) {
        workerService.deleteWorker(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
