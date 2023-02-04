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
import { CityApi } from "../../api/cityApi";
import { ContactApi } from "../../api/contactApi";
import { StateApi } from "../../api/stateApi";
import { CityRes } from "../../dtos/City";
import { StateRes } from "../../dtos/State";
import { AlertBox } from "../../utility/Alerts";

const CityDelete = () => {
  let params = useParams();
  const cityId = params.cityId;
  const [city, setCity] = useState<CityRes>();
  const [addressCount, setAddressCount] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadCity();
    loadAddressCount();
  }, [cityId]);

  const loadCity = () => {
    setError("")
    if (cityId) {
      CityApi.get(cityId)
        .then((res) => {
          setCity(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log("Error in api: " + error);
        });
    }
  };

  const loadAddressCount = () => {
    ContactApi.countAddressesByCityId(cityId).then(res => {
      setAddressCount(res);
    })
  }

  const deleteCity = () => {
    setError("")
    CityApi.delete(cityId).then(res => {
      toast({
        title: "Success",
        description: city?.name + " deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate(-1);
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting City",
        description: error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete City</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showCityInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following City?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>
                {city?.name}
              </Td>
            </Tr>
            <Tr>
              <Th>State</Th>
              <Td>{city?.state?.name}, {city?.state?.country?.name}</Td>
            </Tr>
            <Tr>
              <Th>Address Count</Th>
              <Td>{addressCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {(addressCount > 0) && <AlertBox title="Cannot Delete City" description={"It has addresses."} />}
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"} disabled={addressCount > 0}>
          YES, I WANT TO DELETE THIS CITY
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
            Delete City
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteCity} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete City</Button>
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
        {showCityInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
}

export default CityDelete