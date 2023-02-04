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
import { ContactApi } from "../../api/contactApi";
import { ContactRes } from "../../dtos/Contact";
import { AlertBox } from "../../utility/Alerts";
import ContactHeader from "./ContactHeader";

const ContactDelete = () => {
  let params = useParams();
  const contactId = Number.parseInt(params.contactId || "0");
  const [contact, setContact] = useState<ContactRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadContact();
  }, [contactId]);

  const loadContact = () => {
    setError("")
    if (contactId) {
      ContactApi.get(contactId)
        .then((res) => {
          setContact(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteContact = () => {
    setError("")
    ContactApi.delete(contactId).then(res => {
      toast({
        title: "Success",
        description: contact?.firstName + " " + contact?.lastName + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/contacts");
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Contact",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Contact</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showContactInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Contact?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>
                {contact?.firstName + " " + contact?.lastName}
              </Td>
            </Tr>
            <Tr>
              <Th>Company</Th>
              <Td>{contact?.company}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS CONTACT
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
            Delete Contact
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteContact} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Contact</Button>
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
        <ContactHeader contactId={contactId} />
        {showContactInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default ContactDelete