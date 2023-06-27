import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItem } from "../../components/Api";

function WorkersViewPage() {
  const [worker, setWorker] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchItem("workers", params.id)
      .then((jsonResponse) => setWorker(jsonResponse));
  }, [params.id]);

  return (
    <div className="mx-3">
      <h2 className="my-5">Meistrai</h2>
      <div className="">
        <table className="table table-hover shadow p-3 mb-5 bg-body rounded align-middle">
          <tbody>
            <tr>
              <th scope="col"> Vardas Pavardė</th>
              <td>{worker.name} {worker.surname}</td>
            </tr>
            <tr>
              <th scope="col">Specializacija</th>
              <td>{worker.speciality}</td>
            </tr>
            <tr>
              <th scope="col">Miestas</th>
              <td>{worker.city}</td>
            </tr>
            <tr>
              <th scope="col">Servisas</th>
              <td>
                {worker.place && (
                  <ul>
                    <li className="d-flex align-items-center">
                      <span className="flex-grow-1">{worker.place.name}, {worker.place.address}</span>
                    </li>
                  </ul>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <button className="btn btn-primary me-2 mb-5">
          <Link className="nav-link" to={"/workers/edit/" + worker.id}>
            Redaguoti
          </Link>
        </button>
        <Link to="/workers" className="btn btn-primary mb-5">
          Grįžti į sąrašą
        </Link>
      </div>
    </div>
  );
}

export default WorkersViewPage;
