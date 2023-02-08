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
import { ChatLabelApi } from "../../api/chatLabelApi";
import { ContactChatApi } from "../../api/contactChatApi";
import { ChatLabelRes } from "../../dtos/ChatLabel";
import { AlertBox } from "../../utility/Alerts";

const ChatLabelDelete = () => {
  let params = useParams();
  const chatLabelId = params.chatLabelId;
  const [chatLabel, setChatLabel] = useState<ChatLabelRes>();
  const [anyChats, setAnyChats] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadChatLabel();
    checkAnyChats();
  }, [chatLabelId]);

  const loadChatLabel = () => {
    setError("")
    if (chatLabelId) {
      ChatLabelApi.get(chatLabelId)
        .then((res) => {
          setChatLabel(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const checkAnyChats = () => {
    ContactChatApi.anyChats(chatLabelId).then(res => {
      setAnyChats(res);
    })
  }

  const deleteChatLabel = () => {
    setError("")
    ChatLabelApi.delete(chatLabelId).then(res => {
      toast({
        title: "Success",
        description: chatLabel?.label + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/settings/chat-labels");
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Chat label",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Chat Label</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showChatLabel = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Chat Label?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Label</Th>
              <Td>
                {chatLabel?.label}
              </Td>
            </Tr>
            <Tr>
              <Th>Any Chats</Th>
              <Td>{anyChats ? "Yes" : "No"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {(anyChats) && <AlertBox title="Cannot Delete Chat Label" description={"It is used in chats."} />}
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"} disabled={anyChats}>
          YES, I WANT TO DELETE THIS CHAT LABEL
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
            Delete Chat Label
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteChatLabel} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Chat Label</Button>
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
        {showChatLabel()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default ChatLabelDelete