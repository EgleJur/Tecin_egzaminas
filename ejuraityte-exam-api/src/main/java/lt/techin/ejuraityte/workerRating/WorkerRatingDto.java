package lt.techin.ejuraityte.workerRating;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.worker.Worker;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerRatingDto {

    private Worker worker;

    private int rating;
}
