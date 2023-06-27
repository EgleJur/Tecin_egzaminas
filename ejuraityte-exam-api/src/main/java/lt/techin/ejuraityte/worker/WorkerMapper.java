package lt.techin.ejuraityte.worker;

public class WorkerMapper {

    public static Worker toWorker(WorkerDto workerDto) {
        Worker worker = new Worker();
        worker.setName(workerDto.getName());
        worker.setSurname(workerDto.getSurname());
        worker.setSpeciality(workerDto.getSpeciality());
        worker.setCity(workerDto.getCity());
        worker.setPlace(workerDto.getPlace());
        return worker;
    }

    public static WorkerDto toWorkerDto(Worker worker) {
        WorkerDto workerDto = new WorkerDto();
        workerDto.setName(worker.getName());
        workerDto.setSurname(worker.getSurname());
        workerDto.setSpeciality(worker.getSpeciality());
        workerDto.setCity(worker.getCity());
        workerDto.setPlace(worker.getPlace());
        return workerDto;
    }
}
