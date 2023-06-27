package lt.techin.ejuraityte.menu;

public class MenuMapper {

    public static Menu toMenu(MenuDto menuDto) {

        Menu menu = new Menu();
        menu.setName(menuDto.getName());
        menu.setMeal(menuDto.getMeal());
//        menu.setDescription(menuDto.getDescription());

        return menu;
    }

    public static MenuDto toMenuDto(Menu menu){

        MenuDto menuDto = new MenuDto();
        menuDto.setName(menu.getName());
        menuDto.setMeal(menu.getMeal());
//        menuDto.setDescription(menu.getDescription());

        return menuDto;
    }
}
