package lt.techin.ejuraityte.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.meal.Meal;
import lt.techin.ejuraityte.orderingMeals.OrderingMealRepository;
import lt.techin.ejuraityte.orderingMeals.OrderingMealService;
import lt.techin.ejuraityte.orderingMeals.OrderingMeals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ORDERING")
@Data
@AllArgsConstructor
//@NoArgsConstructor
public class Ordering {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ordering_id;

    @NotBlank
    private String name;

    @NotBlank
    private String client_name;

    private boolean confirmed = Boolean.FALSE;
    @Transient
    private OrderingMealRepository orderingMealRepository;

    @OneToMany(mappedBy = "ordering", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<OrderingMeals> orderedMeals;

    public Ordering() {
        this.orderedMeals = new ArrayList<>();
    }

    @Autowired
    public Ordering(OrderingMealRepository orderingMealRepository) {
        this.orderedMeals = new ArrayList<>();
        this.orderingMealRepository = orderingMealRepository;
    }
    public void addMeal(OrderingMeals meal) {
        if (!this.orderedMeals.contains(meal)) {
            this.orderedMeals.add(meal);
            meal.setOrdering(this);
        }
    }

    public void removeMeal(OrderingMeals meal) {
        this.orderedMeals.remove(meal);
        meal.setOrdering(null);
        meal.getOrdering().getOrderedMeals().remove(meal); // Remove from bidirectional relationship

        // Delete the OrderingMeals entity from the database
        orderingMealRepository.deleteById(meal.getId()); // Replace `mealRepository` with your actual repository variable name
    }
}