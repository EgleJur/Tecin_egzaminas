import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItem } from "../../components/Api";

function PlaceViewPage() {
  const [place, setPlace] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchItem("places", params.id)
      .then((jsonResponse) => setPlace(jsonResponse));
  }, [params.id]);

  return (
    <div className="mx-3">
      <h2 className="my-5">Servisas</h2>
      <div className="">
        <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
          <tbody>
            <tr>
              <th scope="col">Pavadinimas</th>
              <td>{place.name}</td>
            </tr>
            <tr>
              <th scope="col">Adresas</th>
              <td>{place.address}</td>
            </tr>
            <tr>
              <th scope="col">Vadovas</th>
              <td>{place.manager}</td>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-primary me-2 mb-5"
        >
          <Link className="nav-link" to={"/places/edit/" + place.meal_id}>
            Redaguoti
          </Link>
        </button>
        <Link to="/places" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default PlaceViewPage;
