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
import { EmailLabelApi } from "../../api/emailLabelApi";
import { PhoneLabelApi } from "../../api/phoneLabel";
import { EmailLabelRes } from "../../dtos/EmailLabel";
import { PhoneLabelRes } from "../../dtos/PhoneLabel";
import { AlertBox } from "../../utility/Alerts";

const PhoneLabelDelete = () => {
  let params = useParams();
  const phoneLabelId = params.phoneLabelId;
  const [phoneLabel, setPhoneLabel] = useState<PhoneLabelRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadPhoneLabel();
  }, [phoneLabelId]);

  const loadPhoneLabel = () => {
    setError("")
    if (phoneLabelId) {
      PhoneLabelApi.get(phoneLabelId)
        .then((res) => {
          setPhoneLabel(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deletePhoneLabel = () => {
    setError("")
    PhoneLabelApi.delete(phoneLabelId).then(res => {
      toast({
        title: "Success",
        description: phoneLabel?.label + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/settings/phone-labels");
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Phone label",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Phone Label</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showPhoneLabel = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Phone Label?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Label</Th>
              <Td>
                {phoneLabel?.label}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS PHONE LABEL
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
            Delete Phone Label
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deletePhoneLabel} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Phone Label</Button>
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
        {showPhoneLabel()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default PhoneLabelDelete