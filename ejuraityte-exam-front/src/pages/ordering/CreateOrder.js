import { useState, useEffect } from "react";
import { TextField, Collapse, Alert, FormControl, Select, MenuItem, Button } from "@mui/material";
import { apiUrl } from "../../App";
import { fetchItems } from "../../components/Api";
import { Link } from "react-router-dom";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function CreateOrderPage() {
  const [nameError, setNameError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [meals, setMeals] = useState([]);
  const [order, setOrder] = useState({
    name: "",
    clientName: "",
    meals: [],
  });

  useEffect(() => {
    fetchItems("meals").then((jsonResponse) => setMeals(jsonResponse));
  }, []);

  const updateProperty = (property, event) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [property]: event.target.value,
    }));
  };

  const addMeal = () => {
    if (selectedMeal !== "") {
      const selectedMealObj = meals.find((meal) => meal.meal_id === selectedMeal);
      setOrder((prevOrder) => ({
        ...prevOrder,
        meals: [
          ...prevOrder.meals,
          { meal_id: selectedMealObj.meal_id, quantity: 1 },
        ],
      }));
      setSelectedMeal("");
    }
  };

  const removeMeal = (meal_id) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      meals: prevOrder.meals.filter((meal) => meal.meal_id !== meal_id),
    }));
  };

  const updateMealQuantity = (meal_id, newQuantity) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      meals: prevOrder.meals.map((meal) =>
        meal.meal_id === meal_id ? { ...meal, quantity: newQuantity } : meal
      ),
    }));
  };

  const createOrder = () => {
    setNameError(false);
    if (order.name === "") {
      setNameError(true);
    } else {
      const newOrder = {
        clientName: order.clientName,
        confirmed: false,
        meals: order.meals.map((meal) => ({
          meal_id: meal.meal_id,
          quantity: meal.quantity,
        })),
        name: order.name,
      };
      fetch(`${apiUrl}/api/v1/ordering`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      })
        .then((response) => {
          if (response.ok) {
            setSuccess(true);
            setFailure(false);
            setOrder({
              name: "",
              clientName: "",
              meals: [],
            });
            setSelectedMeal("");
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
        })
        .catch((error) => {
          console.error("Error creating order:", error);
          setFailure(true);
          setSuccess(false);
          setTimeout(() => {
            setFailure(false);
          }, 5000);
        });
    }
  };

  return (
    <div className="mx-3">
      <h2 className="my-5">Kurti užsakymą</h2>
      <div className="container-fluid shadow p-3 mb-4 mb-md-5 bg-body rounded">
        <form noValidate>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label htmlFor="menu-name">Pavadinimas *</label>
            </div>
            <div className="col-md-8 mb-2 mb-md-0">
              <TextField
                label=""
                variant="outlined"
                value={order.name}
                onChange={(e) => updateProperty("name", e)}
                error={nameError}
                helperText={nameError ? "Pavadinimas privalomas" : ""}
                className="form-control mb-3"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label htmlFor="menu-name">Klientas</label>
            </div>
            <div className="col-md-8 mb-2 mb-md-0">
              <TextField
                label=""
                variant="outlined"
                value={order.clientName}
                onChange={(e) => updateProperty("clientName", e)}
                className="form-control mb-3"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label>Patiekalai</label>
            </div>
            <div className="col-md-8 mb-2">
              <ul>
                {order.meals.map((meal) => (
                  <li key={meal.meal_id} className="d-flex align-items-center">
                    <div className="col-md-5">{meals.find((m) => m.meal_id === meal.meal_id)?.name}
                    </div>
                    <div className="col-md-5">
                      <button
                        className="btn btn-outline-primary btn-sm mx-2"
                        data-meal-id={meal.meal_id}
                        data-value={meal.quantity - 1}
                        onClick={(e) => updateMealQuantity(meal.meal_id, meal.quantity - 1)}
                      >
                        -
                      </button>
                      {meal.quantity}
                      <button
                        className="btn btn-outline-primary btn-sm mx-2"
                        data-meal-id={meal.meal_id}
                        data-value={meal.quantity + 1}
                        onClick={(e) => updateMealQuantity(meal.meal_id, meal.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button
                        className="btn btn-danger btn-link mx-2"
                        title="Ištrinti"
                        onClick={() => removeMeal(meal.meal_id)}
                      >
                        <DeleteTwoToneIcon className="red-icon" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label htmlFor="add-select-meal">Pridėti patiekalą</label>
            </div>
            <div className="col-md-8 mb-2">
              <FormControl fullWidth size="small" className="mb-3">
                <Select
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Pasirinkite patiekalą
                  </MenuItem>
                  {meals.map((meal) => (
                    <MenuItem key={meal.meal_id} value={meal.meal_id}>
                      {meal.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" onClick={addMeal}>
                Pridėti patiekalą
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary me-2 mb-5"
          onClick={createOrder}
        >
          Kurti užsakymą
        </button>
        <Link to="/orders" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
      <Collapse in={success}>
        <Alert severity="success">Sėkmingai sukurtas!</Alert>
      </Collapse>
      <Collapse in={failure}>
        <Alert severity="error">Sukurti nepavyko, bandykite dar kartą</Alert>
      </Collapse>

    </div>
  );
}

export default CreateOrderPage;
