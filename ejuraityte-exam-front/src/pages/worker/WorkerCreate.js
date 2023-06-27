import {  useEffect } from "react";
import { FormControl, MenuItem, Select, InputLabel} from "@mui/material";
import { useParams } from "react-router-dom";

// function WorkerCreatePage() {
//   const [surname, setYear] = useState("");
//   const [name, setName] = useState("");
//   const [city, setCity] = useState("");
//   const [speciality, setSpeciality] = useState("");
//   const [nameError, setNameError] = useState(false);
//   const [yearError, setYearError] = useState(false);
//   const [studentsError, setStudentsError] = useState(false);
//   const [placeError, setPlaceError] = useState(false);
//   const [shiftError, setShiftError] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [failure, setFailure] = useState(false);
//   const [places, setPlaces] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState("");
//   const [shifts, setShifts] = useState([]);
//   const [selectedShift, setSelectedShift] = useState("");
//   const params = useParams();


//   useEffect(() => {
//     fetchItems("places")
//       .then((jsonResponse) => setPlaces(jsonResponse));
//   }, []);


//   const createNewWorker = (e) => {
//     e.preventDefault();
//     setNameError(false);
//     setStudentsError(false);
//     setYearError(false);
//     setPlaceError(false);
//     setShiftError(false);

//     if (name === "" || speciality === ""
//       || surname === "" || selectedPlace === ""
//       || selectedShift === "") {
//       if (name === "") { setNameError(true); }
//       if (speciality === "") { setStudentsError(true); }
//       if (surname === "") { setYearError(true); }
//       if (selectedPlace === "") { setPlaceError(true); }
//       if (selectedShift === "") { setShiftError(true); }

//     } else {
//       fetch(
//         `${apiUrl}/api/v1/workers`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name,
//             surname,
//             speciality,
//             city,
//             place: selectedPlace,
//           }),
//         }
//       ).then((result) => {
//         if (result.ok) {
//           setName("");
//           setYear("");
//           setSpeciality("");
//           setSuccess(true);
//           setFailure(false);
//           setTimeout(() => {
//             setSuccess(false);
//           }, 5000);
//         } else {
//           setFailure(true);
//           setSuccess(false);
//           setTimeout(() => {
//             setFailure(false);
//           }, 5000);
//         }
//       });
//     }
//   };


//   return (
//     <div className="mx-3">
//       <h2 className="my-5">Pridėti naują grupę</h2>
//       <Collapse in={success}>
//         <Alert
//           onClose={() => {
//             setSuccess(false);
//           }}
//           severity="success"
//           className="mb-3"
//         >
//           Įrašas sėkmingai sukurtas
//         </Alert>
//       </Collapse>

//       <Collapse in={failure}>
//         <Alert
//           onClose={() => {
//             setFailure(false);
//           }}
//           severity="error"
//           className="mb-3"
//         >
//           Įrašo nepavyko sukurti
//         </Alert>
//       </Collapse>
//       <form noValidate>

//         <TextField
//           error={!!nameError}
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           id="create-group-name-with-error"
//           label="Pavadinimas"
//           helperText="Pavadinimas privalomas"
//           className="form-control mb-3"
//           size="small"
//           required
//         />

//         <TextField
//           error={!!yearError}
//           onChange={(e) => setYear(e.target.value)}
//           value={surname}
//           id="create-group-year-with-error"
//           label="Mokslo metai"
//           helperText="Mokslo metai privalomi"
//           className="form-control mb-3"
//           size="small"
//           required
//         />

//         <TextField
//           error={!!studentsError}
//           onChange={(e) => setSpeciality(e.target.value)}
//           value={speciality}
//           id="create-group-students-with-error"
//           label="Studentų skaičius"
//           helperText="Studentų skaičius privalomas"
//           className="form-control mb-3"
//           size="small"
//           required
//         />
//          <TextField
//           error={!!studentsError}
//           onChange={(e) => setCity(e.target.value)}
//           value={city}
//           id="create-group-city-with-error"
//           label="Studentų skaičius"
//           helperText="Studentų skaičius privalomas"
//           className="form-control mb-3"
//           size="small"
//           required
//         />

//         <FormControl fullWidth size="small" className="mb-3">
//           <InputLabel id="select-program-label" error={placeError} required>
//             Pasirinkite programą
//           </InputLabel>
//           <Select
//             error={placeError}
//             labelId="select-program-label"
//             //  InputLabelProps={{ shrink: true }}
//             id="add-select-program"
//             label="Pasirinkite programą"
//             fullWidth
//             value={selectedPlace}
//             // defaultValue={"default"}
//             onChange={(e) => setSelectedPlace(e.target.value)}
//             required>
//             {
//               places.map(
//                 (prog) => (
//                   <MenuItem
//                     key={prog.id}
//                     value={prog.id}
//                     >
//                     {prog.name}
//                   </MenuItem>
//                 ))}
//           </Select>
//         </FormControl>

      

//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={createNewWorker}
//         >
//           Pridėti
//         </button>
//       </form>
//     </div>
//   );
// }

// export default WorkerCreatePage;


import { useState } from "react";
import { TextField, Collapse, Alert } from "@mui/material";
import { apiUrl } from "../../App";
import { fetchItems } from "../../components/Api";
import { Link } from "react-router-dom";

function WorkerCreatePage() {
  const [worker, setWorker] = useState({});
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [specialityError, setSpecialityError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fetchItems("places")
      .then((jsonResponse) => setPlaces(jsonResponse));
  }, []);

  const createWorker = (e) => {
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
        place_id: selectedPlace, // Add the selectedPlace value
      };

      fetch(`${apiUrl}/api/v1/workers/create/place_id=${selectedPlace}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((result) => {
          if (result.ok) {
            setSuccess(true);
            setFailure(false);
            setWorker({}); // Reset the worker state
            setSelectedPlace(null); // Reset the selectedPlace state
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
    setWorker({
      ...worker,
      [property]: event.target.value,
    });
  };

  return (
    <div className="mx-3">
      <h2 className="my-5">Sukurti naują meistrą</h2>

      <Collapse in={success}>
        <Alert
          onClose={() => {
            setSuccess(false);
          }}
          severity="success"
          className="mb-3"
        >
          Meistras sėkmingai sukurtas
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
          Nepavyko sukurti meistro
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
                  onChange={(e) => setSelectedPlace(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Pasirinkite darbovietę
                  </MenuItem>
                  {places?.map((place) => (
                    <MenuItem value={place.id} key={place.id}>
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
          onClick={createWorker}
        >
          Sukurti
        </button>
        <Link to="/workers" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default WorkerCreatePage;
