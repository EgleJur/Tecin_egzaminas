package lt.techin.ejuraityte.orderingMeals;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.meal.Meal;
import lt.techin.ejuraityte.order.Ordering;

@Entity
@Table(name="ORDERING_MEALS")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderingMeals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ordering_id")
    @JsonBackReference
    private Ordering ordering;

    @ManyToOne
    @JoinColumn(name = "meal_id")
    private Meal meal;

    private int quantity;


}
