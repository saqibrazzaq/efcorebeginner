import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { ChatLabelApi } from '../api/chatLabelApi';
import { ChatLabelReqSearch, ChatLabelRes } from '../dtos/ChatLabel';

interface ChhatLabelDropdownParams {
  handleChange?: any;
  selectedChatLabel?: ChatLabelRes;
}

const ChatLabelDropdown = ({handleChange, selectedChatLabel}: ChhatLabelDropdownParams) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<ChatLabelRes[]>([]);
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

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.label || ""}
        getOptionValue={(c) => c.chatLabelId || ""}
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