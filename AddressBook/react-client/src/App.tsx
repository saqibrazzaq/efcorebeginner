import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Countries from "./pages/country/Countries";
import CountryDelete from "./pages/country/CountryDelete";
import CountryEdit from "./pages/country/CountryEdit";
import Home from "./pages/home/Home";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
