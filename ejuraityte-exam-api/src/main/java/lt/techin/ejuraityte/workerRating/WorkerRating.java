package lt.techin.ejuraityte.workerRating;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.orderingMeals.OrderingMeals;
import lt.techin.ejuraityte.worker.Worker;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "WORKER_RATING")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "worker_id")
            private Worker worker;

    private int rating;

}
