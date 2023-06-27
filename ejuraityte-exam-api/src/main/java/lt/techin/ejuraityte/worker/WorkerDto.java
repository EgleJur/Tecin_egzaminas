package lt.techin.ejuraityte.worker;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.techin.ejuraityte.place.Place;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerDto {
    @NotBlank
    private String name;

    @NotBlank
    private String surname;

    @NotBlank
    private String speciality;

    @NotBlank
    private String city;

}
