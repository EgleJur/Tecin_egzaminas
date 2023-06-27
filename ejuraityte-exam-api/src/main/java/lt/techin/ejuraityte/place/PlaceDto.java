package lt.techin.ejuraityte.place;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaceDto {

    @NotBlank
    private String name;
    @NotBlank
    private String address;

    @NotBlank
    private String manager;
}
