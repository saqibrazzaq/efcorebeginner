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
import { StateApi } from "../../api/stateApi";
import { TimezoneApi } from "../../api/TimezoneApi";
import { TranslationApi } from "../../api/translationApi";
import { StateRes } from "../../dtos/State";
import { TimezoneRes } from "../../dtos/Timezone";
import { TranslationRes } from "../../dtos/Translation";
import { AlertBox } from "../../utility/Alerts";

const TranslationDelete = () => {
  let params = useParams();
  const translationId = params.translationId;
  const [translation, setTranslation] = useState<TranslationRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadTranslation();
  }, [translationId]);

  const loadTranslation = () => {
    setError("")
    if (translationId) {
      TranslationApi.get(translationId)
        .then((res) => {
          setTranslation(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteTranslation = () => {
    setError("")
    TranslationApi.delete(translationId).then(res => {
      toast({
        title: "Success",
        description: translation?.name + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Translation",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Translation</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showTranslationInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Translation?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Code</Th>
              <Td>
                {translation?.code}
              </Td>
            </Tr>
            <Tr>
              <Th>Name</Th>
              <Td>{translation?.name}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS TRANSLATION
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
            Delete Translation
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteTranslation} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Translation</Button>
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
        {showTranslationInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default TranslationDelete