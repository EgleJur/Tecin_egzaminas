package lt.techin.ejuraityte.worker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.place.Place;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "WORKER")
@Data
@AllArgsConstructor
//@NoArgsConstructor
public class Worker {
    public Worker() {
        this.place = new Place();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String surname;

    @NotBlank
    private String speciality;

    @NotBlank
    private String city;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "place_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Place place;


}
