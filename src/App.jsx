import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

// import Product from "./Pages/Product";
// import Homepage from "./Pages/Homepage";
// import Pricing from "./Pages/Pricing";
// import Login from "./Pages/Login";
// import AppLayout from "./Pages/AppLayout";
// import PageNotFound from "./Components/PageNotFound";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import Loadable from "./Components/Loadable";

const Product = Loadable(lazy(() => import("./Pages/Product")));
const Homepage = Loadable(lazy(() => import("./Pages/Homepage")));
const Pricing = Loadable(lazy(() => import("./Pages/Pricing")));
const Login = Loadable(lazy(() => import("./Pages/Login")));
const AppLayout = Loadable(lazy(() => import("./Pages/AppLayout")));
const PageNotFound = Loadable(lazy(() => import("./Pages/PageNotFound")));

const App = () => {
  return (
    <BrowserRouter>
      <CitiesProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />}></Route>
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </CitiesProvider>
    </BrowserRouter>
  );
};

export default App;
