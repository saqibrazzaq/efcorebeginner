import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { ChatLabelApi } from '../api/chatLabelApi';
import { ChatLabelReqSearch } from '../dtos/ChatLabel';

const ChatLabelDropdown = ({handleChange, selectedChatLabel}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadChatLabels = () => {
    setIsLoading(true);
    ChatLabelApi.search(new ChatLabelReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadChatLabels();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.label}
        getOptionValue={(c) => c.chatLabelId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select chat label..."
        isLoading={isLoading}
        value={selectedChatLabel}
      ></Select>
  );
}

export default ChatLabelDropdown