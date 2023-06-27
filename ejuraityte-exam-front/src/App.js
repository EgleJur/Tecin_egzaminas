import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import OrderListPage from "./pages/ordering/OrderList";
import CreateOrderPage from "./pages/ordering/CreateOrder";
import ViewOrderPage from "./pages/ordering/ViewOrder";
import EditOrderPage from "./pages/ordering/EditOrder";

import MealListPage from "./pages/meal/MealList";
import CreateMealPage from "./pages/meal/CreateMeal";
import ViewMealPage from "./pages/meal/ViewMeal";
import EditMealPage from "./pages/meal/EditMeal";

import MenuListPage from "./pages/menu/MenuList";
import CreateMenuPage from "./pages/menu/CreateMenu";
import ViewMenuPage from "./pages/menu/ViewMenu";
import EditMenuPage from "./pages/menu/EditMenu";


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
              <Route path="/" element={<MenuListPage />} />

              <Route path="Menu" element={<MenuListPage />} />
              <Route path="Menu/create" element={<CreateMenuPage />} />
              <Route path="Menu/view/:id" element={<ViewMenuPage />} />
              <Route path="Menu/edit/:id" element={<EditMenuPage />} />

              <Route path="orders" element={<OrderListPage />} />
              <Route path="orders/create" element={<CreateOrderPage />} />
              <Route path="orders/view/:id" element={<ViewOrderPage />} />
              <Route path="orders/edit/:id" element={<EditOrderPage />} />

              <Route path="meals" element={<MealListPage />} />
              <Route path="meals/create" element={<CreateMealPage />} />
              <Route path="meals/view/:id" element={<ViewMealPage />} />
              <Route path="meals/edit/:id" element={<EditMealPage />} />

            </Routes>
          </div>
        </HashRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
export { apiUrl };
