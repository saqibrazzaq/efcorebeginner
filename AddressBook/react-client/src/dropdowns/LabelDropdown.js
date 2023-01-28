import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { LabelApi } from '../api/labelApi';
import { LabelReqSearch } from '../dtos/Label';

const LabelDropdown = ({handleChange, selectedLabel}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLabels = () => {
    setIsLoading(true);
    LabelApi.search(new LabelReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLabels();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.name}
        getOptionValue={(c) => c.labelId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select label..."
        isLoading={isLoading}
        value={selectedLabel}
      ></Select>
  );
}

export default LabelDropdown