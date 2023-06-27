import React, { useState, useEffect } from 'react';
import { apiUrl } from "../../App";
import { Link } from "react-router-dom";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteItem, fetchItems } from "../../components/Api";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const WorkerListPage = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchItems("workers")
      .then((jsonResponse) => setWorkers(jsonResponse));
  }, []);

  const deleteWorker = async (id) => {
    try {
      await deleteItem("workers", id);
      const jsonResponse = await fetchItems("workers");
      setWorkers(jsonResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="my-5">Meistrai</h2>
      <div className="d-flex justify-content-end">
        <div className="me-auto d-flex">
          <button className="btn btn-primary mb-4 me-2">
            <Link to="/workers/create" className="nav-link">
              Pridėti naują
            </Link>
          </button>
        </div>
      </div>
      <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vardas Pavardė</th>
            <th>Specializacija</th>
            <th>Miestas</th>
            <th>Servisas</th>
            
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name} {worker.surname}</td>
              <td>{worker.speciality}</td>
              <td>{worker.city}</td>
              <td>{worker.place && (
                  <ul>
                    <li className="d-flex align-items-center">
                      <span className="flex-grow-1">{worker.place.name}, {worker.place.address}</span>
                    </li>
                  </ul>
                )}</td>
              <td>
                <button className="btn btn-outline-primary me-1 my-1 btn-link" title="Žiūrėti">
                  <Link className="nav-link" to={"/workers/view/" + worker.id}>

                    <VisibilityTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-outline-primary me-1 my-1 btn-link" title="Redaguoti"
                >
                  <Link className="nav-link" to={"/workers/edit/" + worker.id}>
                    <EditTwoToneIcon />
                  </Link>
                </button>
                <button
                  className="btn btn-danger me-2 my-1 btn-link" title="Ištrinti"
                  onClick={() => deleteWorker(worker.id)}
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

export default WorkerListPage;
