import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItem } from "../../components/Api";


function ViewOrderPage() {
  const [order, setOrder] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchItem("ordering", params.id)
      .then((jsonResponse) => setOrder(jsonResponse));
  }, [params.id]);

  return (
    <div className="mx-3">
      <h2 className="my-5">Užsakymas</h2>
      <div className="">
        <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
          <tbody>
            <tr>
              <th scope="col">Pavadinimas</th>
              <td>{order.name}</td>
            </tr>
            <tr>
              <th scope="col">Klientas</th>
              <td>{order.client_name}</td>
            </tr>
            <tr>
              <th scope="col">Patiekalai</th>
              <td>
                {order.orderedMeals &&
                  order.orderedMeals.map((orderedMeal) => (
                    <tr>{orderedMeal.quantity} vnt. {orderedMeal.meal.name} </tr>
                  ))}
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary me-2 mb-5">
          <Link to={"/orders/edit/" + params.id} className="nav-link">
            Redaguoti
          </Link>
        </button>
        <Link to="/orders" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default ViewOrderPage;
