import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { PhoneLabelApi } from '../api/phoneLabel';
import { PhoneLabelReqSearch } from '../dtos/PhoneLabel';

const PhoneLabelDropdown = ({handleChange, selectedPhoneLabel}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPhoneLabel = () => {
    setIsLoading(true);
    PhoneLabelApi.search(new PhoneLabelReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPhoneLabel();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.label}
        getOptionValue={(c) => c.phoneLabelId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select phone label..."
        isLoading={isLoading}
        value={selectedPhoneLabel}
      ></Select>
  );
}

export default PhoneLabelDropdown