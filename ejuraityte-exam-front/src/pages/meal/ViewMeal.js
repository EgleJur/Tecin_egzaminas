import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItem } from "../../components/Api";

function ViewMealPage() {
  const [meal, setMeal] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchItem("meals", params.id)
      .then((jsonResponse) => setMeal(jsonResponse));
  }, [params.id]);

  return (
    <div className="mx-3">
      <h2 className="my-5">Patiekalas</h2>
      <div className="">
        <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
          <tbody>
            <tr>
              <th scope="col">Pavadinimas</th>
              <td>{meal.name}</td>
            </tr>
            <tr>
              <th scope="col">Aprašas</th>
              <td>{meal.description}</td>
            </tr>

          </tbody>
        </table>

        <button
          className="btn btn-primary me-2 mb-5"
        >
          <Link className="nav-link" to={"/meals/edit/" + meal.meal_id}>
            Redaguoti
          </Link>
        </button>
        <Link to="/meals" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default ViewMealPage;
