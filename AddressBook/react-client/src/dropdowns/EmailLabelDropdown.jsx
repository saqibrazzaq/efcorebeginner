import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { EmailLabelApi } from '../api/emailLabelApi';
import { EmailLabelReqSearch } from '../dtos/EmailLabel';

const EmailLabelDropdown = ({handleChange, selectedEmailLabel}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadEmailLabels = () => {
    setIsLoading(true);
    EmailLabelApi.search(new EmailLabelReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEmailLabels();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.label}
        getOptionValue={(c) => c.emailLabelId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select email label..."
        isLoading={isLoading}
        value={selectedEmailLabel}
      ></Select>
  );
}

export default EmailLabelDropdown