import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { WebsiteLabelApi } from '../api/websiteLabelApi';
import { WebsiteLabelReqSearch, WebsiteLabelRes } from '../dtos/WebsiteLabel';

interface WebsiteLabelDropdownParams {
  handleChange?: any;
  selectedWebsiteLabel?: WebsiteLabelRes;
}

const WebsiteLabelDropdown = ({handleChange, selectedWebsiteLabel}: WebsiteLabelDropdownParams) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<WebsiteLabelRes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadWebsiteLabels = () => {
    setIsLoading(true);
    WebsiteLabelApi.search(new WebsiteLabelReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadWebsiteLabels();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c.label || ""}
        getOptionValue={(c) => c.websiteLabelId || ""}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select website label..."
        isLoading={isLoading}
        value={selectedWebsiteLabel}
      ></Select>
  );
}

export default WebsiteLabelDropdown