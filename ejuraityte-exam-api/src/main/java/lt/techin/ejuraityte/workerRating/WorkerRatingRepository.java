package lt.techin.ejuraityte.workerRating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerRatingRepository extends JpaRepository<WorkerRating, Long> {
}
