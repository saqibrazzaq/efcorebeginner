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
import { ContactAddressApi } from "../../api/contactAddressApi";
import { ContactAddressRes } from "../../dtos/ContactAddress";
import { AlertBox } from "../../utility/Alerts";

const ContactAddressDelete = () => {
  let params = useParams();
  const contactAddressId = params.contactAddressId;
  const [contactAddress, setContactAddress] = useState<ContactAddressRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadContactAddress();
  }, [contactAddressId]);

  const loadContactAddress = () => {
    setError("")
    if (contactAddressId) {
      ContactAddressApi.get(contactAddressId)
        .then((res) => {
          setContactAddress(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteContactAddress = () => {
    setError("")
    ContactAddressApi.delete(contactAddressId).then(res => {
      toast({
        title: "Success",
        description: contactAddress?.line1 + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Contact address",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Contact Address</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showContactAddressInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Contact Address?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Address</Th>
              <Td>
                {contactAddress?.line1}<br />
                {contactAddress?.line2}
                {contactAddress?.line2 ? <br /> : ''}
                {contactAddress?.city?.name + ", " + contactAddress?.city?.state?.name + ", " +
                contactAddress?.city?.state?.country?.name}
              </Td>
            </Tr>
            <Tr>
              <Th>Label</Th>
              <Td>{contactAddress?.addressLabel?.label}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS CONTACT ADDRESS
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
            Delete Contact Address
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteContactAddress} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Contact Address</Button>
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
        {showContactAddressInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default ContactAddressDelete