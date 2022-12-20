import { Box, Button, Container, Flex, Heading, Link, Spacer, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PersonApi } from "../api/personApi";
import { PersonRes } from "../dtos/Person";
import { Link as RouteLink, useParams } from "react-router-dom";

const Persons = () => {
  const [persons, setPersons] = useState<PersonRes[]>();

  useEffect(() => {
    loadAllPersons();
  }, []);

  const loadAllPersons = () => {
    PersonApi.getAll().then((res) => {
      setPersons(res);
    });
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
          {persons?.map((item) => (
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
      </Table>
    </TableContainer>
  )

  return (
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {showHeading()}
        {showPersons()}
      </Stack>
    </Box>
  );
};

export default Persons;
