import { Box, Button, Center, Container, Flex, Heading, Input, Link, Spacer, Stack, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PersonApi } from "../api/personApi";
import { PersonReqSearch, PersonRes } from "../dtos/Person";
import { Link as RouteLink, useParams } from "react-router-dom";
import PagedRes from "../dtos/PagedRes";

const Persons = () => {
  const [pagedRes, setPagedRes] = useState<PagedRes<PersonRes>>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchReq, setSearchReq] = useState<PersonReqSearch>(
    new PersonReqSearch({}, {})
  );

  useEffect(() => {
    searchPersons();
  }, [searchReq]);

  const searchPersons = () => {
    PersonApi.search(searchReq).then((res) => {
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
        <Heading fontSize={"xl"}>Person List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/persons/edit"}>
          <Button colorScheme={"blue"}>Add Person</Button>
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

  const showPersons = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Gender</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.personId}>
              <Td>{item.personId}</Td>
              <Td>{item.firstName} {item.lastName}</Td>
              <Td>{item.phoneNumber}</Td>
              <Td>{item.gender}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/persons/edit/" + item.personId}
                >
                  Edit
                </Link>
                <Link as={RouteLink} to={"/persons/delete/" + item.personId}>
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
        {showPersons()}
      </Stack>
    </Box>
  );
};

export default Persons;
