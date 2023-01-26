import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import SettingsLayout from "./layout/SettingsLayout";
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
import TimezoneDelete from "./pages/timezone/TimezoneDelete";
import TimezoneEdit from "./pages/timezone/TimezoneEdit";
import Timezones from "./pages/timezone/Timezones";
import TranslationDelete from "./pages/translation/TranslationDelete";
import TranslationEdit from "./pages/translation/TranslationEdit";
import Translations from "./pages/translation/Translations";
import PersonLabelDelete from "./settings/person-labels/PersonLabelDelete";
import PersonLabelEdit from "./settings/person-labels/PersonLabelEdit";
import PersonLabels from "./settings/person-labels/PersonLabels";
import SettingsHome from "./settings/SettingsHome";

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
          {/* Timezones */}
          <Route path="timezones">
            <Route index element={<Timezones />} />
            <Route path="edit" element={<TimezoneEdit />} />
            <Route path="edit/:countryId" element={<TimezoneEdit />} />
            <Route path="edit/:countryId/:timezoneId" element={<TimezoneEdit />} />
            <Route path="delete/:timezoneId" element={<TimezoneDelete />} />
          </Route>
          {/* Translations */}
          <Route path="translations">
            <Route index element={<Translations />} />
            <Route path="edit" element={<TranslationEdit />} />
            <Route path="edit/:countryId" element={<TranslationEdit />} />
            <Route path="edit/:countryId/:translationId" element={<TranslationEdit />} />
            <Route path="delete/:translationId" element={<TranslationDelete />} />
          </Route>
          {/* Settings */}
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<SettingsHome />} />
            {/* Person Label */}
            <Route path="person-labels">
              <Route index element={<PersonLabels />} />
              <Route path="edit" element={<PersonLabelEdit />} />
              <Route path="edit/:personLabelId" element={<PersonLabelEdit />} />
              <Route path="delete/:personLabelId" element={<PersonLabelDelete />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
