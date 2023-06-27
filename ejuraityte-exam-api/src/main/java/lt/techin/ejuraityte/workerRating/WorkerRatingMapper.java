package lt.techin.ejuraityte.workerRating;

public class WorkerRatingMapper {

    public static WorkerRating toWorkerRating(WorkerRatingDto workerRatingDto) {
        WorkerRating workerRating = new WorkerRating();
        workerRating.setWorker(workerRatingDto.getWorker());
        workerRating.setRating(workerRatingDto.getRating());
        return workerRating;
    }

    public static WorkerRatingDto toWorkerRatingDto(WorkerRating workerRating) {
        WorkerRatingDto workerRatingDto = new WorkerRatingDto();
        workerRatingDto.setWorker(workerRating.getWorker());
        workerRatingDto.setRating(workerRating.getRating());
        return workerRatingDto;
    }
}
