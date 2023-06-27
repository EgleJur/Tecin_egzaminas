
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Collapse, Alert } from "@mui/material";
import { apiUrl } from "../../App";
import { fetchItem } from "../../components/Api";
import { Link } from "react-router-dom";

function EditMealPage() {
  const [meal, setMeal] = useState({});
  const [nameError, setNameError] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchItem("meals", params.id)
      .then((jsonResponse) => setMeal(jsonResponse));
  }, [params.id]);

  const editMeal = (e) => {
    e.preventDefault();
    setNameError(false);
    if (meal.name === "") {
      setNameError(true);
    } else {
      fetch(
        `${apiUrl}/api/v1/meals/edit/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meal),
        }
      ).then((result) => {
        if (result.ok) {
          setSuccess(true);
          setFailure(false);
          fetchItem("meals", params.id);
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
  const updateProperty = (property, event) => {
    setMeal({
      ...meal,
      [property]: event.target.value,
    });
  };

  return (
    <div className="mx-3">
      <h2 className="my-5">Redaguoti patiekalą</h2>

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
              <label htmlFor="meal-name">Pavadinimas *</label>
            </div>
            <div className="col-md-8 mb-2 mb-md-0">
              <TextField
                error={!!nameError}
                onChange={(e) => updateProperty("name", e)}
                value={meal.name}
                id="meal-name"
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
              <label htmlFor="meal-description">Aprašymas</label>
            </div>
            <div className="col-md-8 mb-2">
              <TextField
                onChange={(e) => updateProperty("description", e)}
                value={meal.description}
                multiline
                id="meal-description"
                label=""
                className="form-control mb-3"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

        </form>
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary me-2 mb-5"
          onClick={editMeal}
        >
          Redaguoti
        </button>
        <Link to="/meals" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default EditMealPage;
