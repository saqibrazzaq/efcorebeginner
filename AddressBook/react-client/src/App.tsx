import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Cities from "./pages/city/Cities";
import CityDelete from "./pages/city/CityDelete";
import CityEdit from "./pages/city/CityEdit";
import Countries from "./pages/country/Countries";
import CountryDelete from "./pages/country/CountryDelete";
import CountryEdit from "./pages/country/CountryEdit";
import Home from "./pages/home/Home";
import StateDelete from "./pages/state/StateDelete";
import StateEdit from "./pages/state/StateEdit";
import States from "./pages/state/States";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Country */}
          <Route path="countries">
            <Route index element={<Countries />} />
            <Route path="edit" element={<CountryEdit />} />
            <Route path="edit/:countryId" element={<CountryEdit />} />
            <Route path="delete/:countryId" element={<CountryDelete />} />
          </Route>
          {/* State */}
          <Route path="states">
            <Route index element={<States />} />
            <Route path="edit" element={<StateEdit />} />
            <Route path="edit/:countryId" element={<StateEdit />} />
            <Route path="edit/:countryId/:stateId" element={<StateEdit />} />
            <Route path="delete/:stateId" element={<StateDelete />} />
          </Route>
          {/* Cities */}
          <Route path="cities">
            <Route index element={<Cities />} />
            <Route path="edit" element={<CityEdit />} />
            <Route path="edit/:stateId" element={<CityEdit />} />
            <Route path="edit/:stateId/:cityId" element={<CityEdit />} />
            <Route path="delete/:cityId" element={<CityDelete />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
