import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { StateApi } from '../api/stateApi';
import { StateReqSearch } from '../dtos/State';

const StateDropdown = ({handleChange, selectedState}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadStates = () => {
    setIsLoading(true);
    StateApi.search(new StateReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
        // console.log(res.pagedList)
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStates();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c?.name ? (c?.name + ", " + c?.country?.name) : ""}
        getOptionValue={(c) => c.stateId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select state..."
        isLoading={isLoading}
        value={selectedState}
      ></Select>
  );
}

export default StateDropdown