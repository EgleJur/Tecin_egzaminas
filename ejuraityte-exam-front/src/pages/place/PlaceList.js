import React, { useState, useEffect } from 'react';
import { apiUrl } from "../../App";
import { Link } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteItem, fetchItems } from "../../components/Api";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const PlaceListPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchItems("places")
      .then((jsonResponse) => setPlaces(jsonResponse));
  }, []);

  const deletePlace = async (id) => {
    try {
      await deleteItem("places", id);
      const jsonResponse = await fetchItems("places");
      setPlaces(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="my-5">Servisai</h2>
      <div className="d-flex justify-content-end">
        <div className="me-auto d-flex">
          <button className="btn btn-primary mb-4 me-2">
            <Link to="/places/create" className="nav-link">
              Pridėti naują
            </Link>
          </button>
        </div>
      </div>
      <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pavadinimas</th>
            <th>Adresas</th>
            <th>Vadovas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place) => (
            <tr key={place.id}>
              <td>{place.id}</td>
              <td>{place.name}</td>
              <td>{place.address}</td>
              <td>{place.manager}</td>
              <td>
                <button className="btn btn-outline-primary me-1 my-1 btn-link" title="Žiūrėti">
                  <Link className="nav-link" to={"/places/view/" + place.id}>

                    <VisibilityTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-outline-primary me-1 my-1 btn-link" title="Redaguoti"
                >
                  <Link className="nav-link" to={"/places/edit/" + place.id}>
                    <EditTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-danger me-2 my-1 btn-link" title="Ištrinti"
                  onClick={() => deletePlace(place.id)}
                >
                  <DeleteTwoToneIcon className="red-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaceListPage;
