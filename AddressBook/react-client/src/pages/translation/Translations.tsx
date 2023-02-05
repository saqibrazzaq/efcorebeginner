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
import { TimezoneApi } from "../../api/TimezoneApi";
import { TranslationApi } from "../../api/translationApi";
import DeleteIcon from "../../components/icons/DeleteIcon";
import UpdateIcon from "../../components/icons/UpdateIcon";
import CountryDropdown from "../../dropdowns/CountryDropdown";
import { CountryRes } from "../../dtos/Country";
import PagedRes from "../../dtos/PagedRes";
import { StateReqSearch, StateRes } from "../../dtos/State";
import { TimezoneRes } from "../../dtos/Timezone";
import { TranslationRes } from "../../dtos/Translation";
import Common from "../../utility/Common";

const Translations = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  searchParams.set("pageSize", Common.DEFAULT_PAGE_SIZE.toString());

  const [pagedRes, setPagedRes] = useState<PagedRes<TranslationRes>>();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || ""
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryRes>({});

  useEffect(() => {
    loadCountry();
    searchTranslations();
  }, [searchParams]);

  const loadCountry = () => {
    let countryId = searchParams.get("countryId") || undefined;
    CountryApi.get(countryId).then((res) => setSelectedCountry(res));
  };

  const searchTranslations = () => {
    if (!searchParams) return;
    // console.log(Object.fromEntries(searchParams));
    TranslationApi.search(Object.fromEntries(searchParams))
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
        <Heading fontSize={"xl"}>Translation List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/translations/edit/" + (searchParams.get("countryId") ?? "")}>
          <Button colorScheme={"blue"}>Add Translation</Button>
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
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            updateSearchParams("searchText", searchText);
          }}
        >
          Search
        </Button>
      </Box>
    </Flex>
  );

  const showTranslations = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>City Name</Th>
            <Th>GMT Offset</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.translationId}>
              <Td>{item.translationId}</Td>
              <Td>{item.code}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Link mr={2} as={RouteLink} to={"/translations/edit/" + item.countryId + "/" + item.translationId}>
                  <UpdateIcon />
                </Link>
                <Link as={RouteLink} to={"/translations/delete/" + item.translationId}>
                  <DeleteIcon />
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
    <Box width={"4xl"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {displaySearchBar()}
        {showTranslations()}
      </Stack>
    </Box>
  );
}

export default Translations