package lt.techin.ejuraityte.meal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    Page<Meal> findAllByNameIgnoreCaseContaining(String name, Pageable pageable);

    boolean existsByNameIgnoreCase(String name);

}