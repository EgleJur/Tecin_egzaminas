import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItem } from "../../components/Api";

function ViewMenuPage() {
    const [menu, setMenu] = useState({});
    const params = useParams();

    useEffect(() => {
        fetchItem("menu", params.id)
            .then((jsonResponse) => setMenu(jsonResponse));
    }, [params.id]);

    return (
        <div className="mx-3">
            <h2 className="my-5">{menu.name}</h2>
            <div className="">

                <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
                    <thead>
                        <tr>
                            <th>Patiekalai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.meal && menu.meal.length > 0 ? (
                            <ul>
                                {menu.meal.map((meal) => (
                                    <li key={meal.meal_id} className="d-flex align-items-center">
                                        <span className="flex-grow-1">{meal.name}</span>

                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Patiekalų šiame meniu nėra</p>
                        )}
                    </tbody>
                </table>
                <button
                    className="btn btn-primary me-2 mb-5"
                >
                    <Link className="nav-link" to={"/menu/edit/" + menu.meal_id}>
                        Redaguoti
                    </Link>
                </button>
                <Link to="/menu" className="btn btn-primary mb-5">
                    Grįžti į sąrašą
                </Link>
            </div>
        </div>
    );
}

export default ViewMenuPage;
