import React, { useState, useEffect } from 'react';
import { apiUrl } from "../../App";
import { Link } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteItem, fetchItems } from "../../components/Api";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const OrderList = () => {
  const [orderings, setOrderings] = useState([]);

  useEffect(() => {
    fetchItems("ordering")
      .then((jsonResponse) => setOrderings(jsonResponse));
  }, []);

  const deleteOrdering = async (id) => {
    try {
      await deleteItem("ordering", id);
      const jsonResponse = await fetchItems("ordering");
      setOrderings(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmationToggle = async (ordering) => {
    try {
      const id = ordering.ordering_id;
      if (ordering.confirmed) {
        await cancelOrder(id);
      } else {
        await confirmOrder(id);
      }
      const jsonResponse = await fetchItems("ordering");
      setOrderings(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmOrder = (id) => {
    return fetch(`${apiUrl}/api/v1/ordering/confirm/${id}`, { method: "PATCH" });
  };

  const cancelOrder = (id) => {
    return fetch(`${apiUrl}/api/v1/ordering/cancel/${id}`, { method: "PATCH" });
  };

  return (
    <div>
      <h2 className="my-5">Užsakymai</h2>
      <div className="d-flex justify-content-end">
        <div className="me-auto d-flex">
          <button className="btn btn-primary mb-4 me-2">
            <Link to="/orders/create" className="nav-link">
              Pridėti naują
            </Link>
          </button>
        </div>
      </div>
      <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Užsakymo numeris</th>
            <th>Klientas</th>
            <th>Patiekalai</th>
            <th>Patvirtinti</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {orderings.map((ordering) => (
            <tr key={ordering.ordering_id}>
              <td>{ordering.ordering_id}</td>
              <td>{ordering.name}</td>
              <td>{ordering.client_name}</td>
              <td>
                {ordering.orderedMeals.map((orderedMeal) => (
                  <div key={orderedMeal.id}>
                    <span>{orderedMeal.quantity} vnt. </span>
                    <span>{orderedMeal.meal.name}</span>
                  </div>
                ))}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={ordering.confirmed}
                  onChange={() => handleConfirmationToggle(ordering)}
                />
              </td>
              <td>
                <button className="btn btn-outline-primary me-1 my-1 btn-link" title="Žiūrėti">
                  <Link className="nav-link" to={"/orders/view/" + ordering.ordering_id}>

                    <VisibilityTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-outline-primary me-1 my-1 btn-link" title="Redaguoti"
                >
                  <Link className="nav-link" to={"/orders/edit/" + ordering.ordering_id}>
                    <EditTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-danger me-2 my-1 btn-link" title="Ištrinti"
                  onClick={() => deleteOrdering(ordering.ordering_id)}
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

export default OrderList;
