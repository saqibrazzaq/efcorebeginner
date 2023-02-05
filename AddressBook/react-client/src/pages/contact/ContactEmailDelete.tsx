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
import { ContactEmailApi } from "../../api/contactEmail";
import { ContactEmailRes } from "../../dtos/ContactEmail";
import { AlertBox } from "../../utility/Alerts";
import ContactHeader from "./ContactHeader";

const ContactEmailDelete = () => {
  let params = useParams();
  const contactEmailId = params.contactEmailId;
  const contactId = params.contactId;
  const [contactEmail, setContactEmail] = useState<ContactEmailRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadContactEmail();
  }, [contactEmailId]);

  const loadContactEmail = () => {
    setError("")
    if (contactEmailId) {
      ContactEmailApi.get(contactEmailId)
        .then((res) => {
          setContactEmail(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteContactEmail = () => {
    setError("")
    ContactEmailApi.delete(contactEmailId).then(res => {
      toast({
        title: "Success",
        description: contactEmail?.email + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Contact email",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Contact Email</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showContactEmailInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Contact Email?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Email</Th>
              <Td>
                {contactEmail?.email}
              </Td>
            </Tr>
            <Tr>
              <Th>Label</Th>
              <Td>{contactEmail?.emailLabel?.label}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS CONTACT EMAIL
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
            Delete Contact Email
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteContactEmail} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Contact Email</Button>
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
        {showContactEmailInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default ContactEmailDelete