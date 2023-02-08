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
import { AddressLabelApi } from "../../api/addressLabelApi";
import { ContactAddressApi } from "../../api/contactAddressApi";
import { AddressLabelRes } from "../../dtos/AddressLabel";
import { AlertBox } from "../../utility/Alerts";

const AddressLabelDelete = () => {
  let params = useParams();
  const addressLabelId = params.addressLabelId;
  const [addressLabel, setAddressLabel] = useState<AddressLabelRes>();
  const [anyAddress, setAnyAddress] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadAddressLabel();
    checkAnyAddress();
  }, [addressLabelId]);

  const loadAddressLabel = () => {
    setError("")
    if (addressLabelId) {
      AddressLabelApi.get(addressLabelId)
        .then((res) => {
          setAddressLabel(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const checkAnyAddress = () => {
    ContactAddressApi.anyAddress(addressLabelId).then(res => {
      setAnyAddress(res);
    })
  }

  const deleteAddressLabel = () => {
    setError("")
    AddressLabelApi.delete(addressLabelId).then(res => {
      toast({
        title: "Success",
        description: addressLabel?.label + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/settings/address-labels");
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Address label",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Address Label</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showAddressLabel = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Address Label?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Label</Th>
              <Td>
                {addressLabel?.label}
              </Td>
            </Tr>
            <Tr>
              <Th>Any Addresses</Th>
              <Td>{anyAddress ? "Yes" : "No"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {(anyAddress) && <AlertBox title="Cannot Delete Address Label" description={"It is used in addresses."} />}
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"} disabled={anyAddress}>
          YES, I WANT TO DELETE THIS ADDRESS LABEL
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
            Delete Address Label
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteAddressLabel} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Address Label</Button>
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
        {showAddressLabel()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default AddressLabelDelete