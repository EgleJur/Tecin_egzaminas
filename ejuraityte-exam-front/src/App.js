import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";

import WorkerListPage from "./pages/worker/WorkerList";
import WorkerCreatePage from "./pages/worker/WorkerCreate";
import WorkerViewPage from "./pages/worker/WorkerView";
import WorkerEditPage from "./pages/worker/WorkerEdit";

import PlaceListPage from "./pages/place/PlaceList";
import PlaceCreatePage from "./pages/place/PlaceCreate";
import PlaceViewPage from "./pages/place/PlaceView";
import PlaceEditPage from "./pages/place/PlaceEdit";


import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { lt } from "date-fns/locale";

const apiUrl = "http://localhost:8080";

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={lt}
      localeText={{
        previousMonth: "Ankstesnis mėnuo",
        nextMonth: "Kitas mėnuo",
      }}
    >
      <div className="App">
        <HashRouter>
          <Navigation />
          <div className="container-xxl">
            <Routes>
              <Route path="/" element={<PlaceListPage />} />

              <Route path="workers" element={<WorkerListPage />} />
              <Route path="workers/create" element={<WorkerCreatePage />} />
              <Route path="workers/view/:id" element={<WorkerViewPage />} />
              <Route path="workers/edit/:id" element={<WorkerEditPage />} />

              <Route path="places" element={<PlaceListPage />} />
              <Route path="places/create" element={<PlaceCreatePage />} />
              <Route path="places/view/:id" element={<PlaceViewPage />} />
              <Route path="places/edit/:id" element={<PlaceEditPage />} />

            </Routes>
          </div>
        </HashRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
export { apiUrl };
