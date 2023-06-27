import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Collapse, Alert, FormControl, Select, MenuItem } from "@mui/material";
import { apiUrl } from "../../App";
import { fetchItem, fetchItems } from "../../components/Api";
import { Link } from "react-router-dom";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


function WorkerEditPage() {
    const [worker, setWorker] = useState({});
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [specialityError, setSpecialityError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null); // Change initial value to null
    const params = useParams();
    const [showPlaceMenuItem, setShowPlaceMenuItem] = useState(true);

    useEffect(() => {
        fetchItem("workers", params.id)
            .then((jsonResponse) => setWorker(jsonResponse));
    }, [params.id]);

    useEffect(() => {
        fetchItems("places")
            .then((jsonResponse) => setPlaces(jsonResponse));
    }, []);

    const editWorker = (e) => {
        e.preventDefault();
        setNameError(false);
        setSurnameError(false);
        setSpecialityError(false);
        setCityError(false);
        if (worker.name === "" || worker.surname === "" || worker.speciality === "" || worker.city === "") {
            if (worker.name === "") setNameError(true);
            if (worker.surname === "") setSurnameError(true);
            if (worker.speciality === "") setSpecialityError(true);
            if (worker.city === "") setCityError(true);
        } else {
            const requestBody = {
                name: worker.name,
                surname: worker.surname,
                speciality: worker.speciality,
                city: worker.city,
              };
            
              fetch(`${apiUrl}/api/v1/workers/edit/${params.id}?place_id=${selectedPlace}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              
            }).then((result) => {
                if (result.ok) {
                    setSuccess(true);
                    setFailure(false);
                    fetchItem("workers", params.id);
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
        if (property === "place") {
            setSelectedPlace(event.target.value); // Set the selectedPlace as the entire object
        } else {
            setWorker({
                ...worker,
                [property]: event.target.value,
            });
        }
    };


    return (
        <div className="mx-3">
            <h2 className="my-5">Redaguoti meistro duomenis</h2>

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
                            <label htmlFor="worker-name">Vardas *</label>
                        </div>
                        <div className="col-md-8 mb-2 mb-md-0">
                            <TextField
                                error={nameError}
                                onChange={(e) => updateProperty("name", e)}
                                value={worker.name || ""}
                                id="worker-name"
                                label=""
                                helperText="Vardas privalomas"
                                className="form-control mb-3"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-2 mb-md-0 fw-bold">
                            <label htmlFor="worker-surname">Pavardė *</label>
                        </div>
                        <div className="col-md-8 mb-2 mb-md-0">
                            <TextField
                                error={surnameError}
                                onChange={(e) => updateProperty("surname", e)}
                                value={worker.surname || ""}
                                id="worker-surname"
                                label=""
                                helperText="Pavardė privaloma"
                                className="form-control mb-3"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-2 mb-md-0 fw-bold">
                            <label htmlFor="worker-speciality">Specialybė</label>
                        </div>
                        <div className="col-md-8 mb-2">
                            <TextField
                                error={specialityError}
                                onChange={(e) => updateProperty("speciality", e)}
                                value={worker.speciality || ""}
                                multiline
                                id="worker-speciality"
                                label=""
                                className="form-control mb-3"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-2 mb-md-0 fw-bold">
                            <label htmlFor="worker-city">Miestas</label>
                        </div>
                        <div className="col-md-8 mb-2">
                            <TextField
                                error={cityError}
                                onChange={(e) => updateProperty("city", e)}
                                value={worker.city || ""}
                                multiline
                                id="worker-city"
                                label=""
                                className="form-control mb-3"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-2 mb-md-0 fw-bold">
                            <label htmlFor="add-place">Darbovietė *</label>
                        </div>
                        <div className="col-md-8 mb-2">
                            <FormControl fullWidth size="small" className="mb-3">
                                <Select
                                    labelId="select-place-label"
                                    id="select-place"
                                    fullWidth
                                    value={selectedPlace}
                                    onChange={(e) => updateProperty("place", e)} // Pass the entire event object
                                    displayEmpty
                                    onOpen={() => {
                                        setShowPlaceMenuItem(false);
                                    }}
                                    onClose={() => {
                                        setShowPlaceMenuItem(true);
                                    }}
                                >
                                    <MenuItem
                                        value=""
                                        style={{ display: showPlaceMenuItem ? "block" : "none" }}
                                    >
                                        {worker.place?.name}
                                    </MenuItem>
                                    {places?.map((place) => (
                                        <MenuItem
                                            value={place.id}
                                            key={place.id}
                                        >
                                            {place.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                </form>
            </div>
            <div>
                <button
                    type="submit"
                    className="btn btn-primary me-2 mb-5"
                    onClick={editWorker}
                >
                    Redaguoti
                </button>
                <Link to="/workers" className="btn btn-primary mb-5">
                    Grįžti į sąrašą
                </Link>
            </div>
        </div>
    );
}

export default WorkerEditPage;
