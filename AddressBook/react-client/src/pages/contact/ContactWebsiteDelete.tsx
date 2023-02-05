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
import { ContactWebsiteApi } from "../../api/contactWebsiteApi";
import { ContactWebsiteRes } from "../../dtos/ContactWebsite";
import { AlertBox } from "../../utility/Alerts";
import ContactHeader from "./ContactHeader";

const ContactWebsiteDelete = () => {
  let params = useParams();
  const contactWebsiteId = params.contactWebsiteId;
  const contactId = params.contactId;
  const [contactWebsite, setContactWebsite] = useState<ContactWebsiteRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadContactWebsite();
  }, [contactWebsiteId]);

  const loadContactWebsite = () => {
    setError("")
    if (contactWebsiteId) {
      ContactWebsiteApi.get(contactWebsiteId)
        .then((res) => {
          setContactWebsite(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteContactWebsite = () => {
    setError("")
    ContactWebsiteApi.delete(contactWebsiteId).then(res => {
      toast({
        title: "Success",
        description: contactWebsite?.website + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Contact website",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Contact Website</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showContactWebsiteInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Contact Website?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Website</Th>
              <Td>
                {contactWebsite?.website}
              </Td>
            </Tr>
            <Tr>
              <Th>Label</Th>
              <Td>{contactWebsite?.websiteLabel?.label}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS CONTACT WEBSITE
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
            Delete Contact Website
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteContactWebsite} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Contact Website</Button>
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
        {showContactWebsiteInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default ContactWebsiteDelete