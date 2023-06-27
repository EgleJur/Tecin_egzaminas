package lt.techin.ejuraityte.menu;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findAllByOrderByIdAsc();

    boolean existsByNameIgnoreCase(String name);

    Page<Menu> findAllByNameIgnoreCaseContaining(String name, Pageable pageable);

//    Page<Menu> findAllByBuildingIgnoreCaseContaining(String building, Pageable pageable);
//
//    Page<Menu> findAllByNameIgnoreCaseContainingAndBuildingIgnoreCaseContaining(String name, String building, Pageable pageable);
}
