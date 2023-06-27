package lt.techin.ejuraityte.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Ordering, Long> {

    List<Ordering> findAllByOrderByConfirmedAsc();

    boolean existsByNameIgnoreCase(String name);

    Page<Ordering> findAllByNameIgnoreCaseContaining(String name, Pageable pageable);
}
