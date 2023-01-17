import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { CountryApi } from '../api/countryApi';
import { CountryReqSearch } from '../dtos/Country';

const CountryDropdown = ({handleChange, selectedCountry}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCountries = () => {
    setIsLoading(true);
    CountryApi.search(new CountryReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCountries();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.countryId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select country..."
        isLoading={isLoading}
        value={selectedCountry}
      ></Select>
  );
}

export default CountryDropdown