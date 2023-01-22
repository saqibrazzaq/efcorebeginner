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
import { StateRes } from "../../dtos/State";
import { TimezoneRes } from "../../dtos/Timezone";
import { AlertBox } from "../../utility/Alerts";

const TimezoneDelete = () => {
  let params = useParams();
  const timezoneId = params.timezoneId;
  const [timezone, setTimezone] = useState<TimezoneRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadTimezone();
  }, [timezoneId]);

  const loadTimezone = () => {
    setError("")
    if (timezoneId) {
      TimezoneApi.get(timezoneId)
        .then((res) => {
          setTimezone(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const deleteTimezone = () => {
    setError("")
    TimezoneApi.delete(timezoneId).then(res => {
      toast({
        title: "Success",
        description: timezone?.name + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting Timezone",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Timezone</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showTimezoneInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Timezone?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>
                {timezone?.name}
              </Td>
            </Tr>
            <Tr>
              <Th>City Name</Th>
              <Td>{timezone?.cityName}</Td>
            </Tr>
            <Tr>
              <Th>Offset</Th>
              <Td>{timezone?.gmtOffsetName}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS TIMEZONE
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
            Delete Timezone
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteTimezone} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Timezone</Button>
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
        {showTimezoneInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default TimezoneDelete