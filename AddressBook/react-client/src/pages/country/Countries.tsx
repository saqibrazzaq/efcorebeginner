import { Box, Button, Center, Container, Flex, Heading, Input, Link, Spacer, Stack, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { CountryApi } from '../../api/countryApi';
import { CountryReqSearch, CountryRes } from '../../dtos/Country';
import PagedRes from '../../dtos/PagedRes';
import { Link as RouteLink, useParams } from "react-router-dom";

const Countries = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<CountryRes>>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchReq, setSearchReq] = useState<CountryReqSearch>(
    new CountryReqSearch({}, {})
  );
  useEffect(() => {
    searchCountries();
  }, [searchReq]);

  const searchCountries = () => {
    CountryApi.search(searchReq).then((res) => {
      setPagedRes(res);
      console.log(res)
    });
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      setSearchReq({
        ...searchReq,
        ...{ pageNumber: previousPageNumber },
      });
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      setSearchReq({ ...searchReq, ...{ pageNumber: nextPageNumber } });
    }
  };

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Country List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/countries/edit"}>
          <Button colorScheme={"blue"}>Add Country</Button>
        </Link>
      </Box>
    </Flex>
  )

  const displaySearchBar = () => (
    <Flex>
      <Center></Center>
      <Box flex={1} ml={4}></Box>

      <Box ml={4}>
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchReq({
                ...searchReq,
                ...{ searchText: searchText },
              });
            }
          }}
        />
      </Box>
      <Box ml={0}>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            setSearchReq({ ...searchReq, ...{ searchText: searchText } });
          }}
        >
          Search
        </Button>
      </Box>
    </Flex>
  );

  const showCountries = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Code</Th>
            <Th>Currency</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.countryId}>
              <Td>{item.countryId}</Td>
              <Td>{item.name}</Td>
              <Td>{item.iso3}</Td>
              <Td>{item.currency}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/countries/edit/" + item.countryId}
                >
                  Edit
                </Link>
                <Link as={RouteLink} to={"/countries/delete/" + item.countryId}>
                  Delete
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
  )

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {displaySearchBar()}
        {showCountries()}
      </Stack>
    </Box>
  );
}

export default Countries