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
import { ContactLabelApi } from "../../api/contactLabelApi";
import { ContactLabelRes } from "../../dtos/ContactLabel";
import { AlertBox } from "../../utility/Alerts";
import ContactHeader from "./ContactHeader";

const ContactLabelDelete = () => {
  let params = useParams();
  const contactLabelId = params.contactLabelId;
  const [contactLabel, setContactLabel] = useState<ContactLabelRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadContactLabel();
  }, [contactLabelId]);

  const loadContactLabel = () => {
    setError("")
    if (contactLabelId) {
      ContactLabelApi.get(contactLabelId)
        .then((res) => {
          setContactLabel(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteContactLabel = () => {
    setError("")
    ContactLabelApi.delete(contactLabelId).then(res => {
      toast({
        title: "Success",
        description: contactLabel?.label?.name + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Contact label",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Contact Label</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showContactLabelInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Contact Label?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Label</Th>
              <Td>
                {contactLabel?.label?.name}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS CONTACT LABEL
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
            Delete Contact Label
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteContactLabel} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Contact Label</Button>
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
        <ContactHeader contactId={contactLabel?.contactId} />
        {showContactLabelInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default ContactLabelDelete