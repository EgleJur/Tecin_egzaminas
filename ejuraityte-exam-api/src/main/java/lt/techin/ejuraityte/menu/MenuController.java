package lt.techin.ejuraityte.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import lt.techin.ejuraityte.meal.Meal;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    @Autowired
    private final MenuService menuService;


    public MenuController(MenuService menuService){

        this.menuService = menuService;
    }

    @GetMapping
    public List<Menu> getAll(){
        return menuService.getAll();
    }

    @PostMapping
    public ResponseEntity<Menu> createMenu(@RequestBody MenuDto menuDto) {
        Menu createdMenu = menuService.createMenu(menuDto);
        return new ResponseEntity<>(createdMenu, HttpStatus.CREATED);
    }

        @GetMapping("/{id}")
    public Optional<Menu> getById(@PathVariable Long id) {
        return menuService.getById(id);
    }

//    @PatchMapping("/edit/{id}")
//    public ResponseEntity<Menu> edit(@PathVariable Long id,
//                                     @Valid @RequestBody MenuDto menuDto) {
//        return ResponseEntity.ok(menuService.edit(id, MenuMapper.toMenu(menuDto)));
//    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Menu> editMenu(@PathVariable Long id, @Valid @RequestBody MenuDto menuDto) {
        Menu editedMenu = menuService.edit(id, MenuMapper.toMenu(menuDto));
        return ResponseEntity.ok(editedMenu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        menuService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
