package lt.techin.ejuraityte.meal;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.orderingMeals.OrderingMeals;

import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "MEAL_TABLE")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meal_id;

    @NotBlank
    private String name;

    private String description;


}