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
  createSearchParams,
  Link as RouteLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { URLSearchParams } from "url";
import { CountryApi } from "../../api/countryApi";
import { StateApi } from "../../api/stateApi";
import DeleteIcon from "../../components/icons/DeleteIcon";
import UpdateIcon from "../../components/icons/UpdateIcon";
import CountryDropdown from "../../dropdowns/CountryDropdown";
import { CountryRes } from "../../dtos/Country";
import PagedRes from "../../dtos/PagedRes";
import { StateReqSearch, StateRes } from "../../dtos/State";
import Common from "../../utility/Common";

const States = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  searchParams.set("pageSize", Common.DEFAULT_PAGE_SIZE.toString());

  const [pagedRes, setPagedRes] = useState<PagedRes<StateRes>>();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || ""
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryRes>({});

  useEffect(() => {
    loadCountry();
    searchStates();
  }, [searchParams]);

  const loadCountry = () => {
    let countryId = searchParams.get("countryId") || undefined;
    CountryApi.get(countryId).then((res) => setSelectedCountry(res));
  };

  const searchStates = () => {
    if (!searchParams) return;
    // console.log(Object.fromEntries(searchParams));
    StateApi.search(Object.fromEntries(searchParams))
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
        <Heading fontSize={"xl"}>State List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/states/edit/" + (searchParams.get("countryId") ?? "")}>
          <Button colorScheme={"blue"}>Add State</Button>
        </Link>
      </Box>
    </Flex>
  );

  const displaySearchBar = () => (
    <Flex>
      <Center>
        <Text>Select country:</Text>
      </Center>
      <Box flex={1} ml={4}>
        <CountryDropdown
          selectedCountry={selectedCountry}
          handleChange={(newValue?: CountryRes) => {
            updateSearchParams("countryId", newValue ? newValue?.countryId + "" : "");
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

  const showStates = () => (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Code</Th>
            <Th>Country</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.stateId}>
              <Td>{item.name}</Td>
              <Td>{item.code}</Td>
              <Td>{item.country?.name}</Td>
              <Td>
                <Link mr={2} as={RouteLink} to={"/states/edit/" + item.countryId + "/" + item.stateId}>
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/states/delete/" + item.stateId}>
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
        {showStates()}
      </Stack>
    </Box>
  );
};

export default States;
