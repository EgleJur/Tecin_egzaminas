package lt.techin.ejuraityte.validationUnits;

import lt.techin.ejuraityte.exception.ValidationException;

public class ValidationUtilsNotNull {

    public static void isValidById(Long id) {
        if (id == null || id.equals("")) {
            throw new ValidationException("Id cannot be empty", "id",
                    "Id is empty", String.valueOf(id));
        }
    }
    public static void isValidByName(String name) {
        if (name == null || name.isEmpty() || name.equals("")) {
            throw new ValidationException("Name cannot be empty", "name",
                    "Name is empty", name);
        }
    }

    public static void isValidByDate(String year){
        if (year == null || year.isEmpty() || year.equals("")) {
            throw new ValidationException("Date cannot be empty", "date",
                    "Date is empty", year);
        }
    }

}

