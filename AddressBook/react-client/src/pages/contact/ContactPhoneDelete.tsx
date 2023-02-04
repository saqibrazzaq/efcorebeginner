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
import { ContactPhoneApi } from "../../api/contactPhone";
import { ContactPhoneRes } from "../../dtos/ContactPhone";
import { AlertBox } from "../../utility/Alerts";
import ContactHeader from "./ContactHeader";

const ContactPhoneDelete = () => {
  let params = useParams();
  const contactPhoneId = params.contactPhoneId;
  const [contactPhone, setContactPhone] = useState<ContactPhoneRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadContactPhone();
  }, [contactPhoneId]);

  const loadContactPhone = () => {
    setError("")
    if (contactPhoneId) {
      ContactPhoneApi.get(contactPhoneId)
        .then((res) => {
          setContactPhone(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteContactPhone = () => {
    setError("")
    ContactPhoneApi.delete(contactPhoneId).then(res => {
      toast({
        title: "Success",
        description: contactPhone?.phone + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Contact phone",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Contact Phone</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showContactPhoneInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Contact Phone?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Phone</Th>
              <Td>
                {contactPhone?.country?.phoneCode} {contactPhone?.phone}
              </Td>
            </Tr>
            <Tr>
              <Th>Label</Th>
              <Td>{contactPhone?.phoneLabel?.label}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS CONTACT PHONE
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
            Delete Contact Phone
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteContactPhone} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Contact Phone</Button>
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
        <ContactHeader contactId={parseInt(contactPhone?.contactId || "0")} />
        {showContactPhoneInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default ContactPhoneDelete