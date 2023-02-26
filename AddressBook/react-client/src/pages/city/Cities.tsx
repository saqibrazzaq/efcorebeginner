import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  Link as RouteLink,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { CityApi } from "../../api/cityApi";
import { StateApi } from "../../api/stateApi";
import DeleteIcon from "../../components/icons/DeleteIcon";
import UpdateIcon from "../../components/icons/UpdateIcon";
import StateDropdown from "../../dropdowns/StateDropdown";
import { CityRes } from "../../dtos/City";
import PagedRes from "../../dtos/PagedRes";
import { StateRes } from "../../dtos/State";
import Common from "../../utility/Common";
const Cities = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  searchParams.set("pageSize", Common.DEFAULT_PAGE_SIZE.toString());

  const [pagedRes, setPagedRes] = useState<PagedRes<CityRes>>();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || ""
  );
  const [selectedState, setSelectedState] = useState<StateRes>({});

  useEffect(() => {
    loadState();
    searchCities();
  }, [searchParams]);

  const loadState = () => {
    const stateId = searchParams.get("stateId") || undefined;
    StateApi.get(stateId).then((res) => setSelectedState(res));
  };

  const searchCities = () => {
    if (!searchParams) return;
    // console.log(Object.fromEntries(searchParams));
    CityApi.search(Object.fromEntries(searchParams))
      .then((res) => {
        setPagedRes(res);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      updateSearchParams("pageNumber", previousPageNumber.toString());
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      updateSearchParams("pageNumber", nextPageNumber.toString());
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>City List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/cities/edit/" + (searchParams.get("stateId") ?? "")}>
          <Button colorScheme={"blue"}>Add City</Button>
        </Link>
      </Box>
    </Flex>
  );

  const displaySearchBar = () => (
    <Flex>
      <Center>
        <Text>Select state:</Text>
      </Center>
      <Box flex={1} ml={4}>
        <StateDropdown
          selectedState={selectedState}
          handleChange={(newValue?: StateRes) => {
            updateSearchParams("stateId", newValue ? newValue?.stateId + "" : "");
            updateSearchParams("pageNumber", "1");
          }}
        />
      </Box>

      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value || "")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateSearchParams("searchText", searchText);
              updateSearchParams("pageNumber", "1");
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            updateSearchParams("searchText", searchText);
            updateSearchParams("pageNumber", "1");
          }}
        >
          Search
        </Button>
      </Box>
    </Flex>
  );

  const showCities = () => (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>State, Country</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.cityId}>
              <Td>{item.name}</Td>
              <Td>{item.state?.name}, {item.state?.country?.name}</Td>
              <Td>
                <Link mr={2} as={RouteLink} to={"/cities/edit/" + item.stateId + "/" + item.cityId}>
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/cities/delete/" + item.cityId}>
                  <DeleteIcon size="xs" fontSize="15" />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={2} textAlign="center">
              <Button
                isDisabled={!pagedRes?.metaData?.hasPrevious}
                variant="link"
                mr={5}
                onClick={previousPage}
              >
                Previous
              </Button>
              Page {pagedRes?.metaData?.currentPage} of{" "}
              {pagedRes?.metaData?.totalPages}
              <Button
                isDisabled={!pagedRes?.metaData?.hasNext}
                variant="link"
                ml={5}
                onClick={nextPage}
              >
                Next
              </Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );

  return (
    <Box width={"3xl"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {displaySearchBar()}
        {showCities()}
      </Stack>
    </Box>
  );
}

export default Cities