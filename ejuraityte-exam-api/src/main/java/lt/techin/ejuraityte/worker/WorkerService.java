package lt.techin.ejuraityte.worker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkerService {
    private final WorkerRepository workerRepository;

    @Autowired
    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    public Optional<Worker> getWorkerById(Long id) {
        return workerRepository.findById(id);
    }

    public Worker createWorker(Worker worker) {
        return workerRepository.save(worker);
    }

    public Worker updateWorker(Long id, Worker updatedWorker) {
        Optional<Worker> existingWorker = workerRepository.findById(id);
        if (existingWorker.isPresent()) {
            Worker worker = existingWorker.get();
            worker.setName(updatedWorker.getName());
            worker.setSurname(updatedWorker.getSurname());
            worker.setSpeciality(updatedWorker.getSpeciality());
            worker.setCity(updatedWorker.getCity());
            worker.setPlace(updatedWorker.getPlace());
            return workerRepository.save(worker);
        }
        return null;
    }

    public void deleteWorker(Long id) {
        workerRepository.deleteById(id);
    }
}
