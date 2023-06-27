
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Collapse, Alert } from "@mui/material";
import { apiUrl } from "../../App";
import { fetchItem } from "../../components/Api";
import { Link } from "react-router-dom";

function PlaceEditPage() {
  const [place, setPlace] = useState({});
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [managerError, setManagerError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchItem("places", params.id)
      .then((jsonResponse) => setPlace(jsonResponse));
  }, [params.id]);

  const editPlace = (e) => {
    e.preventDefault();
    setNameError(false);
    setAddressError(false);
    setManagerError(false);
    if (place.name === ""|| place.address === ""||place.manager ==="") {
        if (place.name === "") { setNameError(true); }
        if (place.address === "") { setAddressError(true); }
        if (place.manager === "") { setManagerError(true); }
    } else {
      fetch(
        `${apiUrl}/api/v1/places/edit/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(place),
        }
      ).then((result) => {
        if (result.ok) {
          setSuccess(true);
          setFailure(false);
          fetchItem("places", params.id);
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
    setPlace({
      ...place,
      [property]: event.target.value,
    });
  };

  return (
    <div className="mx-3">
      <h2 className="my-5">Redaguoti servisą</h2>

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
              <label htmlFor="place-name">Pavadinimas *</label>
            </div>
            <div className="col-md-8 mb-2 mb-md-0">
              <TextField
                error={!!nameError}
                onChange={(e) => updateProperty("name", e)}
                value={place.name}
                id="place-name"
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
              <label htmlFor="place-address">Adresas</label>
            </div>
            <div className="col-md-8 mb-2">
              <TextField
              error={!!addressError}
                onChange={(e) => updateProperty("address", e)}
                value={place.address}
                multiline
                id="place-address"
                label=""
                className="form-control mb-3"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-2 mb-md-0 fw-bold">
              <label htmlFor="place-manager">Vadovas</label>
            </div>
            <div className="col-md-8 mb-2">
              <TextField
              error={!!managerError}
                onChange={(e) => updateProperty("manager", e)}
                value={place.manager}
                multiline
                id="place-manager"
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
          onClick={editPlace}
        >
          Redaguoti
        </button>
        <Link to="/places" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default PlaceEditPage;
