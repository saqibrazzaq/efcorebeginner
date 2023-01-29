import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import SettingsLayout from "./layout/SettingsLayout";
import Cities from "./pages/city/Cities";
import CityDelete from "./pages/city/CityDelete";
import CityEdit from "./pages/city/CityEdit";
import ContactDelete from "./pages/contact/ContactDelete";
import ContactEdit from "./pages/contact/ContactEdit";
import Contacts from "./pages/contact/Contacts";
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
import AddressLabelDelete from "./settings/address-labels/AddressLabelDelete";
import AddressLabelEdit from "./settings/address-labels/AddressLabelEdit";
import AddressLabels from "./settings/address-labels/AddressLabels";
import ChatLabelDelete from "./settings/chat-labels/ChatLabelDelete";
import ChatLabelEdit from "./settings/chat-labels/ChatLabelEdit";
import ChatLabels from "./settings/chat-labels/ChatLabels";
import EmailLabelDelete from "./settings/email-labels/EmailLabelDelete";
import EmailLabelEdit from "./settings/email-labels/EmailLabelEdit";
import EmailLabels from "./settings/email-labels/EmailLabels";
import LabelDelete from "./settings/labels/LabelDelete";
import LabelEdit from "./settings/labels/LabelEdit";
import Labels from "./settings/labels/Labels";
import PhoneLabelDelete from "./settings/phone-labels/PhoneLabelDelete";
import PhoneLabelEdit from "./settings/phone-labels/PhoneLabelEdit";
import PhoneLabels from "./settings/phone-labels/PhoneLabels";
import SettingsHome from "./settings/SettingsHome";
import WebsiteLabelDelete from "./settings/website-labels/WebsiteLabelDelete";
import WebsiteLabelEdit from "./settings/website-labels/WebsiteLabelEdit";
import WebsiteLabels from "./settings/website-labels/WebsiteLabels";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Contacts />} />
          {/* Contacts */}
          <Route path="contacts">
            <Route index element={<Contacts />} />
            <Route path="edit" element={<ContactEdit />} />
            <Route path="edit/:personId" element={<ContactEdit />} />
            <Route path="delete/:personId" element={<ContactDelete />} />
          </Route>
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
            {/* Label */}
            <Route path="labels">
              <Route index element={<Labels />} />
              <Route path="edit" element={<LabelEdit />} />
              <Route path="edit/:labelId" element={<LabelEdit />} />
              <Route path="delete/:labelId" element={<LabelDelete />} />
            </Route>
            {/* Email Label */}
            <Route path="email-labels">
              <Route index element={<EmailLabels />} />
              <Route path="edit" element={<EmailLabelEdit />} />
              <Route path="edit/:emailLabelId" element={<EmailLabelEdit />} />
              <Route path="delete/:emailLabelId" element={<EmailLabelDelete />} />
            </Route>
            {/* Phone label */}
            <Route path="phone-labels">
              <Route index element={<PhoneLabels />} />
              <Route path="edit" element={<PhoneLabelEdit />} />
              <Route path="edit/:phoneLabelId" element={<PhoneLabelEdit />} />
              <Route path="delete/:phoneLabelId" element={<PhoneLabelDelete />} />
            </Route>
            {/* Address label */}
            <Route path="address-labels">
              <Route index element={<AddressLabels />} />
              <Route path="edit" element={<AddressLabelEdit />} />
              <Route path="edit/:addressLabelId" element={<AddressLabelEdit />} />
              <Route path="delete/:addressLabelId" element={<AddressLabelDelete />} />
            </Route>
            {/* Website label */}
            <Route path="website-labels">
              <Route index element={<WebsiteLabels />} />
              <Route path="edit" element={<WebsiteLabelEdit />} />
              <Route path="edit/:websiteLabelId" element={<WebsiteLabelEdit />} />
              <Route path="delete/:websiteLabelId" element={<WebsiteLabelDelete />} />
            </Route>
            {/* Chat label */}
            <Route path="chat-labels">
              <Route index element={<ChatLabels />} />
              <Route path="edit" element={<ChatLabelEdit />} />
              <Route path="edit/:chatLabelId" element={<ChatLabelEdit />} />
              <Route path="delete/:chatLabelId" element={<ChatLabelDelete />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
