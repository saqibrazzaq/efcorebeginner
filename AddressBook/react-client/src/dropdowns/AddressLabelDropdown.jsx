import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { AddressLabelApi } from '../api/addressLabelApi';
import { AddressLabelReqSearch } from '../dtos/AddressLabel';

const AddressLabelDropdown = ({handleChange, selectedAddressLabel}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadAddressLabels = () => {
    setIsLoading(true);
    AddressLabelApi.search(new AddressLabelReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAddressLabels();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.label}
        getOptionValue={(c) => c.addressLabelId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select address label..."
        isLoading={isLoading}
        value={selectedAddressLabel}
      ></Select>
  );
}

export default AddressLabelDropdown