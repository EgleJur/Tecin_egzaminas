import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { apiUrl } from "../../App";

function CreateMealPage() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const createNewMeal = (e) => {
    e.preventDefault();
    setNameError(false);
    setDescriptionError(false);
    if (name === "" || description === "") {
      if (name === "") { setNameError(true); }
      if (description === "") { setDescriptionError(true); }
    } else {
      fetch(
        `${apiUrl}/api/v1/meals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
          }),
        }
      ).then((result) => {
        if (result.ok) {
          setName("");
          setDescription("");
        }
      });
    }
  };


  return (
    <div className="mx-3">
      <h2 className="my-5">
        Pridėti naują patiekalą</h2>

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
          error={!!descriptionError}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="create-meal-description-with-error"
          label="Aprašymas"
          helperText="Aprašymas privalomas"
          className="form-control mb-3"
          size="small"
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={createNewMeal}
        >
          Pridėti
        </button>
      </form>
    </div>
  );
}

export default CreateMealPage;
