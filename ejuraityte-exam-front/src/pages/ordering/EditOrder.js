
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Collapse, Alert, FormControl, Select, MenuItem } from "@mui/material";
import { apiUrl } from "../../App";
import { fetchItem, fetchItems } from "../../components/Api";
import { Link } from "react-router-dom";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

function EditOrderPage() {
  const [order, setOrder] = useState({});
  const [nameError, setNameError] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [meals, setMeals] = useState([]);
  const params = useParams();
  const [mealQuantities, setMealQuantities] = useState({});

  useEffect(() => {
    fetchItem("ordering", params.id)
      .then((jsonResponse) => setOrder(jsonResponse));
  }, [params.id]);

  useEffect(() => {
    fetchItems("meals")
      .then((jsonResponse) => setMeals(jsonResponse));
  }, []);

  const addMeal = () => {
    if (selectedMeal !== "") {
      const selectedMealObj = meals.find((meal) => meal.meal_id === selectedMeal);
      const updatedOrderedMeals = [
        ...order.orderedMeals,
        { meal: selectedMealObj, quantity: 1 },
      ];
      setOrder({ ...order, orderedMeals: updatedOrderedMeals });
      setSelectedMeal("");
    }
  };
  const updateProperty = (property, event) => {
    if (property === "quantity") {
      const { mealId, value } = event.target.dataset;
      const updatedQuantities = {
        ...mealQuantities,
        [mealId]: parseInt(value),
      };
      setMealQuantities(updatedQuantities);

      const updatedOrderedMeals = order.orderedMeals.map((meal) => {
        if (meal.meal.meal_id === mealId) {
          return { ...meal, quantity: updatedQuantities[mealId] };
        }
        return meal;
      });
      setOrder({ ...order, orderedMeals: updatedOrderedMeals });
    } else if (property === "client_name") {
      setOrder({
        ...order,
        client_name: event.target.value,
      });
    } else {
      setOrder({
        ...order,
        [property]: event.target.value,
      });
    }
  };

  const removeMeal = (mealId) => {
    const updatedOrderedMeals = order.orderedMeals.filter(
      (meal) => meal.meal.meal_id !== mealId
    );
    setOrder({ ...order, orderedMeals: updatedOrderedMeals });
  };

  const editOrder = (e) => {
    e.preventDefault();
    setNameError(false);

    const updatedOrderedMeals = order.orderedMeals.map((meal) => ({
      ...meal,
      quantity: mealQuantities[meal.meal.meal_id] || meal.quantity,
    }));

    const updatedOrder = { ...order, orderedMeals: updatedOrderedMeals };

    if (updatedOrder.name === "") {
      setNameError(true);
    } else {
      fetch(`${apiUrl}/api/v1/ordering/edit/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      })
        .then((result) => {
          if (result.ok) {
            setSuccess(true);
            setFailure(false);
            fetchItem("ordering", params.id);
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
          } else {
            setFailure(true);
            setSuccess(false);
            setTimeout(() => {
              setFailure(false);
            }, 5000);
          }
        });
    }
  };

  return (
    <div className="mx-3">
      <h2 className="my-5">Redaguoti</h2>

      <Collapse in={success}>
        <Alert
          onClose={() => {
            setSuccess(false);
          }}
          severity="success"
          className="mb-3"
        >
          Įrašas sėkmingai atnaujintas
        </Alert>
      </Collapse>
      <Collapse in={failure}>
        <Alert
          onClose={() => {
            setFailure(false);
          }}
          severity="error"
          className="mb-3"
        >
          Įrašo nepavyko atnaujinti
        </Alert>
      </Collapse>
      <div className="container-fluid shadow p-3 mb-4 mb-md-5 bg-body rounded">
        <form noValidate>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label htmlFor="menu-name">Pavadinimas *</label>
            </div>
            <div className="col-md-8 mb-2 mb-md-0">
              <TextField
                error={!!nameError}
                onChange={(e) => updateProperty("name", e)}
                value={order.name}
                id="order-name"
                label=""
                helperText="Pavadinimas privalomas"
                className="form-control mb-3"
                size="small"
                InputLabelProps={{ shrink: true }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label htmlFor="menu-name">Klientas</label>
            </div>
            <div className="col-md-8 mb-2 mb-md-0">
              <TextField
                onChange={(e) => updateProperty("client_name", e)}
                value={order.client_name}
                id="client-name"
                label=""
                className="form-control mb-3"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label>Patiekalai</label>
            </div>
            <div className="col-md-8 mb-2">
              {order.orderedMeals &&
                order.orderedMeals.map((orderedMeal) => (
                  <div key={orderedMeal.meal.meal_id} className=" row ">
                    <div className="col-md-5">{orderedMeal.meal.name}</div>
                    <div className="col-md-5">
                      <button
                        className="btn btn-outline-primary btn-sm mx-2"
                        data-meal-id={orderedMeal.meal.meal_id}
                        data-value={mealQuantities[orderedMeal.meal.meal_id] - 1 || orderedMeal.quantity - 1}
                        onClick={(e) => updateProperty("quantity", e)}
                      >
                        -
                      </button>
                      {mealQuantities[orderedMeal.meal.meal_id] || orderedMeal.quantity}
                      <button
                        className=" btn btn-outline-primary btn-sm mx-2"
                        data-meal-id={orderedMeal.meal.meal_id}
                        data-value={mealQuantities[orderedMeal.meal.meal_id] + 1 || orderedMeal.quantity + 1}
                        onClick={(e) => updateProperty("quantity", e)}
                      >
                        +
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-danger btn-link mx-2"
                        title="Ištrinti"
                        onClick={() => removeMeal(orderedMeal.meal.meal_id)}
                      >
                        <DeleteTwoToneIcon className="red-icon" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label htmlFor="add-select-meal">Pridėti patiekalą</label>
            </div>
            <div className="col-md-8 mb-2">

              <FormControl fullWidth size="small" className="mb-3">
                <Select
                  labelId="select-meal-label"
                  InputLabelProps={{ shrink: true }}
                  id="add-select-meal"
                  fullWidth
                  value={selectedMeal}
                  onChange={(event) => setSelectedMeal(event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Pasirinkite patiekalą
                  </MenuItem>
                  {meals.map((meal) => (
                    <MenuItem value={meal.meal_id} key={meal.meal_id}>
                      {meal.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addMeal}
              >
                Pridėti patiekalą
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary me-2 mb-5"
          onClick={editOrder}
        >
          Redaguoti
        </button>
        <Link to="/orders" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default EditOrderPage;
