import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { apiUrl } from "../../App";

function PlaceCreatePage() {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [managerError, setManagerError] = useState(false);

  const createNewPlace = (e) => {
    e.preventDefault();
    setNameError(false);
    setAddressError(false);
    if (name === "" || address === ""||manager ==="") {
      if (name === "") { setNameError(true); }
      if (address === "") { setAddressError(true); }
      if (manager === "") { setManagerError(true); }
    } else {
      fetch(
        `${apiUrl}/api/v1/places`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            address,
            manager,
          }),
        }
      ).then((result) => {
        if (result.ok) {
          setName("");
          setAddress("");
          setManager("");
        }
      });
    }
  };


  return (
    <div className="mx-3">
      <h2 className="my-5">
        Pridėti naują servisą</h2>

      <form noValidate>

        <TextField
          error={!!nameError}
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="create-meal-name-with-error"
          label="Pavadinimas"
          helperText="Pavadinimas privalomas"
          className="form-control mb-3"
          size="small"
          required
        />
        

        <TextField
          error={!!addressError}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          id="create-place-address-with-error"
          label="Adresas"
          helperText="Adresas privalomas"
          className="form-control mb-3"
          size="small"
          required
        />
         <TextField
          error={!!managerError}
          onChange={(e) => setManager(e.target.value)}
          value={manager}
          id="create-place-manager-with-error"
          label="Vadovas"
          helperText="Vadovas privalomas"
          className="form-control mb-3"
          size="small"
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={createNewPlace}
        >
          Pridėti
        </button>
      </form>
    </div>
  );
}

export default PlaceCreatePage;
