import {
  Avatar,
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
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PagedRes from "../../dtos/PagedRes";
import {
  Link as RouteLink,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Common from "../../utility/Common";
import UpdateIcon from "../../components/icons/UpdateIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import { ContactRes } from "../../dtos/Contact";
import { ContactApi } from "../../api/contactApi";

const Contacts = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  searchParams.set("pageSize", Common.DEFAULT_PAGE_SIZE.toString());

  const [pagedRes, setPagedRes] = useState<PagedRes<ContactRes>>();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    searchContacts();
  }, [searchParams]);

  const searchContacts = () => {
    if (!searchParams) return;
    ContactApi.search(Object.fromEntries(searchParams)).then((res) => {
      setPagedRes(res);
      // console.log(res)
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
        <Heading fontSize={"xl"}>Contacts</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/contacts/edit"}>
          <Button colorScheme={"blue"}>Add Contact</Button>
        </Link>
      </Box>
    </Flex>
  );

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

  const showContacts = () => (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList?.map((item) => (
            <Tr key={item.contactId}>
              <Td>
                <Avatar size={"sm"} src={item.pictureUrl} />
              </Td>
              <Td>{item.firstName + " " + item.lastName}</Td>
              <Td>{item.contactEmails?.at(0)?.email}</Td>
              <Td>{item.contactPhones?.at(0)?.phone}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/contacts/edit/" + item.contactId}
                >
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/contacts/delete/" + item.contactId}>
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
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {displaySearchBar()}
        {showContacts()}
      </Stack>
    </Box>
  );
}

export default Contacts