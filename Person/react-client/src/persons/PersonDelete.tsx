import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams, Link as RouteLink, useNavigate } from "react-router-dom";
import { PersonApi } from "../api/personApi";
import { PersonRes } from "../dtos/Person";
import { AlertBox } from "../utility/Alerts";

const PersonDelete = () => {
  let params = useParams();
  const personId = params.personId;
  const [person, setPerson] = useState<PersonRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadPerson();
  }, [personId]);

  const loadPerson = () => {
    setError("")
    if (personId) {
      PersonApi.get(personId)
        .then((res) => {
          setPerson(res);
          console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deletePerson = () => {
    setError("")
    PersonApi.delete(personId).then(res => {
      toast({
        title: "Success",
        description: person?.firstName + " " + person?.lastName + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/persons");
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Person",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Person</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showPersonInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Person?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>
                {person?.firstName} {person?.lastName}
              </Td>
            </Tr>
            <Tr>
              <Th>Phone</Th>
              <Td>{person?.phoneNumber}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS PERSON
        </Button>
      </HStack>
    </div>
  );

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Person
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deletePerson} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Person</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {error && <AlertBox description={error} />}
        {showPersonInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
};

export default PersonDelete;
