
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Collapse, Alert, FormControl, Select, MenuItem } from "@mui/material";
import { apiUrl } from "../../App";
import { fetchItem, fetchItems } from "../../components/Api";
import { Link } from "react-router-dom";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

function EditMenuPage() {
    const [menu, setMenu] = useState({});
    const [nameError, setNameError] = useState("");
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState("");
    const [meals, setMeals] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetchItem("menu", params.id)
            .then((jsonResponse) => setMenu(jsonResponse));
    }, [params.id]);

    useEffect(() => {
        fetchItems("meals")
            .then((jsonResponse) => setMeals(jsonResponse));
    }, []);

    const updateProperty = (property, event) => {
        setMenu({
            ...menu,
            [property]: event.target.value,
        });
        console.log(setMenu);
    };
    const addMeal = () => {
        if (selectedMeal !== "") {
            const selectedMealObj = meals.find(meal => meal.meal_id === selectedMeal);
            setMenu(prevMenu => ({
                ...prevMenu,
                meal: [...prevMenu.meal, selectedMealObj]
            }));
            console.log(selectedMealObj);
            setSelectedMeal("");
        }
    };

    const removeMeal = (mealId) => {
        setMenu(prevMenu => ({
            ...prevMenu,
            meal: prevMenu.meal.filter(meal => meal.meal_id !== mealId)
        }));
    };

    const editMenu = (e) => {
        e.preventDefault();
        setNameError(false);
        console.log(menu);
        if (menu.name === "") {
            setNameError(true);
        } else {
            fetch(
                `${apiUrl}/api/v1/menu/edit/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(menu),
                }
            ).then((result) => {
                if (result.ok) {
                    setSuccess(true);
                    setFailure(false);
                    fetchItem("menu", params.id);
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
                                value={menu.name}
                                id="menu-name"
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
                            <label>Patiekalai</label>
                        </div>
                        <div className="col-md-8 mb-2">
                            {menu.meal && menu.meal.length > 0 ? (
                                <ul>
                                    {menu.meal.map((meal) => (
                                        <li key={meal.meal_id} className="d-flex align-items-center">
                                            <span className="flex-grow-1">{meal.name}</span>
                                            <button
                                                className="btn btn-danger btn-link mx-5 "
                                                title="Ištrinti"
                                                onClick={() => removeMeal(meal.meal_id)}
                                            >
                                                <DeleteTwoToneIcon className="red-icon" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Patiekalų šiame meniu nėra</p>
                            )}
                        </div>
                        <div className="row">
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
                    </div>
                </form>
            </div>
            <div>
                <button
                    type="submit"
                    className="btn btn-primary me-2 mb-5"
                    onClick={editMenu}
                >
                    Redaguoti
                </button>
                <Link to="/menu" className="btn btn-primary mb-5">
                    Grįžti į sąrašą
                </Link>
            </div>
        </div>
    );
}

export default EditMenuPage;
