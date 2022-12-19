import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Layout from "./layout/Layout";
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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
