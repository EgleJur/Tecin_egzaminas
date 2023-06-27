import React, { useState, useEffect } from 'react';
import { apiUrl } from "../../App";
import { Link } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteItem, fetchItems } from "../../components/Api";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const MealListPage = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchItems("menu")
      .then((jsonResponse) => setMenu(jsonResponse));
  }, []);

  const deleteMenu = async (id) => {
    try {
      await deleteItem("menu", id);
      const jsonResponse = await fetchItems("menu");
      setMenu(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="my-5">Meniu</h2>
      <div className="d-flex justify-content-end">
        <div className="me-auto d-flex">
          <button className="btn btn-primary mb-4 me-2">
            <Link to="/menu/create" className="nav-link">
              Pridėti naują
            </Link>
          </button>
        </div>
      </div>
      <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pavadinimas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.name}</td>
              <td>
                <button className="btn btn-outline-primary me-1 my-1 btn-link" title="Žiūrėti">
                  <Link className="nav-link" to={"/menu/view/" + menu.id}>

                    <VisibilityTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-outline-primary me-1 my-1 btn-link" title="Redaguoti"
                >
                  <Link className="nav-link" to={"/menu/edit/" + menu.id}>
                    <EditTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-danger me-2 my-1 btn-link" title="Ištrinti"
                  onClick={() => deleteMenu(menu.id)}
                >
                  <DeleteTwoToneIcon className="red-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealListPage;

