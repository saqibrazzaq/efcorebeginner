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
import { ContactEmailApi } from "../../api/contactEmailApi";
import { EmailLabelApi } from "../../api/emailLabelApi";
import { EmailLabelRes } from "../../dtos/EmailLabel";
import { AlertBox } from "../../utility/Alerts";

const EmailLabelDelete = () => {
  let params = useParams();
  const emailLabelId = params.emailLabelId;
  const [emailLabel, setEmailLabel] = useState<EmailLabelRes>();
  const [anyEmail, setAnyEmail] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadEmailLabel();
    checkAnyEmail();
  }, [emailLabelId]);

  const loadEmailLabel = () => {
    setError("")
    if (emailLabelId) {
      EmailLabelApi.get(emailLabelId)
        .then((res) => {
          setEmailLabel(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const checkAnyEmail = () => {
    ContactEmailApi.anyEmail(emailLabelId).then(res => {
      setAnyEmail(res);
    })
  }

  const deleteEmailLabel = () => {
    setError("")
    EmailLabelApi.delete(emailLabelId).then(res => {
      toast({
        title: "Success",
        description: emailLabel?.label + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/settings/email-labels");
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Email label",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Email Label</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showEmailLabel = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Email Label?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Label</Th>
              <Td>
                {emailLabel?.label}
              </Td>
            </Tr>
            <Tr>
              <Th>Any Emails</Th>
              <Td>{anyEmail ? "Yes" : "No"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {(anyEmail) && <AlertBox title="Cannot Delete Email Label" description={"It is used in emails."} />}
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"} disabled={anyEmail}>
          YES, I WANT TO DELETE THIS EMAIL LABEL
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
            Delete Email Label
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteEmailLabel} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Email Label</Button>
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
        {showEmailLabel()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default EmailLabelDelete