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
import { WebsiteLabelApi } from "../../api/websiteLabelApi";
import { WebsiteLabelRes } from "../../dtos/WebsiteLabel";
import { AlertBox } from "../../utility/Alerts";

const WebsiteLabelDelete = () => {
  let params = useParams();
  const websiteLabelId = params.websiteLabelId;
  const [websiteLabel, setWebsiteLabel] = useState<WebsiteLabelRes>();
  const [anyWebsite, setAnyWebsite] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadWebsiteLabel();
    checkAnyWebsite();
  }, [websiteLabelId]);

  const loadWebsiteLabel = () => {
    setError("")
    if (websiteLabelId) {
      WebsiteLabelApi.get(websiteLabelId)
        .then((res) => {
          setWebsiteLabel(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const checkAnyWebsite = () => {
    ContactWebsiteApi.anyWebsite(websiteLabelId).then(res => {
      setAnyWebsite(res);
    })
  }

  const deleteWebsiteLabel = () => {
    setError("")
    WebsiteLabelApi.delete(websiteLabelId).then(res => {
      toast({
        title: "Success",
        description: websiteLabel?.label + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/settings/website-labels");
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Website label",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Website Label</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showWebsiteLabel = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Website Label?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Label</Th>
              <Td>
                {websiteLabel?.label}
              </Td>
            </Tr>
            <Tr>
              <Th>Any Website</Th>
              <Td>{anyWebsite ? "Yes" : "No"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {(anyWebsite) && <AlertBox title="Cannot Delete Website Label" description={"It is used in websites."} />}
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"} disabled={anyWebsite}>
          YES, I WANT TO DELETE THIS WEBSITE LABEL
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
            Delete Website Label
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteWebsiteLabel} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Website Label</Button>
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
        {showWebsiteLabel()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default WebsiteLabelDelete