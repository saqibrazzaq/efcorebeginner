import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Layout from "./layout/Layout";
import PersonDelete from "./persons/PersonDelete";
import PersonEdit from "./persons/PersonEdit";
import Persons from "./persons/Persons";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Persons */}
          <Route path="persons">
            <Route index element={<Persons />} />
            <Route path="edit" element={<PersonEdit />} />
            <Route path="edit/:personId" element={<PersonEdit />} />
            <Route path="delete/:personId" element={<PersonDelete />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
