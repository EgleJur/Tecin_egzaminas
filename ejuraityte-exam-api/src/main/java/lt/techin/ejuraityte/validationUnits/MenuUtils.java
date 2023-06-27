package lt.techin.ejuraityte.validationUnits;

import lt.techin.ejuraityte.exception.ValidationException;
import lt.techin.ejuraityte.menu.Menu;
import lt.techin.ejuraityte.menu.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;


public class MenuUtils {

    @Autowired
    private final MenuRepository menuRepository;

    public MenuUtils(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public Menu getMenuById(Long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Menu does not exist", "id",
                        "Menu not found", String.valueOf(id)));
    }

    public void checkMenuNameUnique(String name) {
        if (existsByName(name)) {
            throw new ValidationException("Menu name must be unique", "name", "Name already exists", name);
        }
    }

//    public void getMenuByNumber(String number) {
//        if (existsByName(number)) {
//            throw new ValidationException("Menu name must be unique",
//                    "name", "Name already exists", number);
//        }
//    }
//
    public boolean existsByName(String name) {
        return menuRepository.existsByNameIgnoreCase(name);
    }



}
