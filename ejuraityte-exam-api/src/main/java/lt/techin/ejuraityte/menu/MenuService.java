package lt.techin.ejuraityte.menu;

import lt.techin.ejuraityte.meal.Meal;
import lt.techin.ejuraityte.validationUnits.MenuUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static lt.techin.ejuraityte.validationUnits.ValidationUtilsNotNull.isValidByName;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

   MenuUtils menuUtils;

    public MenuService(MenuRepository menuRepository) {

        this.menuRepository = menuRepository;
        menuUtils = new MenuUtils(menuRepository);
    }

    public List<Menu> getAll() {

        return menuRepository.findAllByOrderByIdAsc();
    }

    public Optional<Menu> getById(Long id) {
        return menuRepository.findById(id);
    }

    public Menu createMenu(MenuDto menuDto) {
        Menu menu = new Menu();
        menu.setName(menuDto.getName());
        menu.setMeal(menuDto.getMeal());
        return menuRepository.save(menu);
    }

    public Menu edit(Long id, Menu menu) {
        isValidByName(menu.getName());
        Menu existingMenu = menuUtils.getMenuById(id);
        existingMenu.setName(menu.getName());
        existingMenu.setMeal(menu.getMeal());

        return menuRepository.save(existingMenu);
    }

        public void delete(Long id) {
            menuRepository.deleteById(id);
        }

}
