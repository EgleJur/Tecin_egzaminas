import React, { useState, useEffect } from 'react';
import { apiUrl } from "../../App";
import { Link } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteItem, fetchItems } from "../../components/Api";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const MealListPage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchItems("meals")
      .then((jsonResponse) => setMeals(jsonResponse));
  }, []);

  const deleteMeal = async (id) => {
    try {
      await deleteItem("meals", id);
      const jsonResponse = await fetchItems("meals");
      setMeals(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="my-5">Patiekalai</h2>
      <div className="d-flex justify-content-end">
        <div className="me-auto d-flex">
          <button className="btn btn-primary mb-4 me-2">
            <Link to="/meals/create" className="nav-link">
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
            <th>Aprašymas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.meal_id}>
              <td>{meal.meal_id}</td>
              <td>{meal.name}</td>
              <td>{meal.description}</td>
              <td>
                <button className="btn btn-outline-primary me-1 my-1 btn-link" title="Žiūrėti">
                  <Link className="nav-link" to={"/meals/view/" + meal.meal_id}>

                    <VisibilityTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-outline-primary me-1 my-1 btn-link" title="Redaguoti"
                >
                  <Link className="nav-link" to={"/meals/edit/" + meal.meal_id}>
                    <EditTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-danger me-2 my-1 btn-link" title="Ištrinti"
                  onClick={() => deleteMeal(meal.meal_id)}
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
