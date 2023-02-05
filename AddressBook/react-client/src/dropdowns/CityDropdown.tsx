import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react'
import { CityApi } from '../api/cityApi';
import { CityReqSearch, CityRes } from '../dtos/City';

interface CityDropdownParams {
  handleChange?: any;
  selectedCity?: CityRes;
}

const CityDropdown = ({handleChange, selectedCity}: CityDropdownParams) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<CityRes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCities = () => {
    setIsLoading(true);
    CityApi.search(new CityReqSearch({ searchText: inputValue }, {}))
      .then((res) => {
        setItems(res.pagedList);
        // console.log(res.pagedList)
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCities();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <Select
        getOptionLabel={(c) => c?.name + ", " + c?.state?.name + ", " + c?.state?.country?.name}
        getOptionValue={(c) => c.cityId || ""}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select city..."
        isLoading={isLoading}
        value={selectedCity}
      ></Select>
  );
}

export default CityDropdown