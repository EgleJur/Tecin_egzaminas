package lt.techin.ejuraityte.orderingMeals;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.ejuraityte.order.Ordering;

public interface OrderingMealRepository extends JpaRepository<OrderingMeals, Long> {

    List<OrderingMeals> findByOrdering(Ordering order);
}
