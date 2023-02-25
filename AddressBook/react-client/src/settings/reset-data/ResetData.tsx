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
import { NumericFormat } from "react-number-format";
import { useParams, Link as RouteLink, useNavigate } from "react-router-dom";
import { AddressLabelApi } from "../../api/addressLabelApi";
import { ChatLabelApi } from "../../api/chatLabelApi";
import { CityApi } from "../../api/cityApi";
import { ContactAddressApi } from "../../api/contactAddressApi";
import { ContactApi } from "../../api/contactApi";
import { ContactChatApi } from "../../api/contactChatApi";
import { ContactEmailApi } from "../../api/contactEmailApi";
import { ContactLabelApi } from "../../api/contactLabelApi";
import { ContactPhoneApi } from "../../api/contactPhoneApi";
import { ContactWebsiteApi } from "../../api/contactWebsiteApi";
import { CountryApi } from "../../api/countryApi";
import { EmailLabelApi } from "../../api/emailLabelApi";
import { LabelApi } from "../../api/labelApi";
import { PhoneLabelApi } from "../../api/phoneLabelApi";
import { ResetDataApi } from "../../api/resetDataApi";
import { StateApi } from "../../api/stateApi";
import { WebsiteLabelApi } from "../../api/websiteLabelApi";
import { AlertBox } from "../../utility/Alerts";

const ResetData = () => {

  const [countryCount, setCountryCount] = useState(0);
  const [stateCount, setStateCount] = useState(0);
  const [cityCount, setCityCount] = useState(0);

  const [contactCount, setContactCount] = useState(0);
  const [contactLabelCount, setContactLabelCount] = useState(0);
  const [contactEmailCount, setContactEmailCount] = useState(0);
  const [contactPhoneCount, setContactPhoneCount] = useState(0);
  const [contactAddressCount, setContactAddressCount] = useState(0);
  const [contactWebsiteCount, setContactWebsiteCount] = useState(0);
  const [contactChatCount, setContactChatCount] = useState(0);

  const [labelCount, setLabelCount] = useState(0);
  const [emailLabelCount, setEmailLabelCount] = useState(0);
  const [phoneLabelCount, setPhoneLabelCount] = useState(0);
  const [addressLabelCount, setAddressLabelCount] = useState(0);
  const [websiteLabelCount, setWebsiteLabelCount] = useState(0);
  const [chatLabelCount, setChatLabelCount] = useState(0);

  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = () => {
    loadCountryCount();
    loadStateCount();
    loadCityCount();

    loadContactCount();
    loadContactLabelCount();
    loadContactEmailCount();
    loadContactPhoneCount();
    loadContactAddressCount();
    loadContactWebsiteCount();
    loadContactChatCount();

    loadLabelCount();
    loadEmailLabelCount();
    loadPhoneLabelCount();
    loadAddressLabelCount();
    loadWebsiteLabelCount();
    loadChatLabelCount();
  }

  const loadChatLabelCount = () => {
    ChatLabelApi.count().then(res => setChatLabelCount(res));
  }

  const loadWebsiteLabelCount = () => {
    WebsiteLabelApi.count().then(res => setWebsiteLabelCount(res));
  }

  const loadAddressLabelCount = () => {
    AddressLabelApi.count().then(res => setAddressLabelCount(res));
  }

  const loadPhoneLabelCount = () => {
    PhoneLabelApi.count().then(res => setPhoneLabelCount(res));
  }

  const loadEmailLabelCount = () => {
    EmailLabelApi.count().then(res => setEmailLabelCount(res));
  }

  const loadLabelCount = () => {
    LabelApi.count().then(res => setLabelCount(res));
  }

  const loadContactChatCount = () => {
    ContactChatApi.count().then(res => setContactChatCount(res));
  }

  const loadContactWebsiteCount = () => {
    ContactWebsiteApi.count().then(res => setContactWebsiteCount(res));
  }

  const loadContactAddressCount = () => {
    ContactAddressApi.count().then(res => setContactAddressCount(res));
  }

  const loadContactPhoneCount = () => {
    ContactPhoneApi.count().then(res => setContactPhoneCount(res));
  }

  const loadCountryCount = () => {
    CountryApi.count().then(res => setCountryCount(res));
  }

  const loadStateCount = () => {
    StateApi.count().then(res => setStateCount(res));
  }

  const loadCityCount = () => {
    CityApi.count().then(res => setCityCount(res));
  }

  const loadContactCount = () => {
    ContactApi.count().then(res => setContactCount(res));
  }

  const loadContactLabelCount = () => {
    ContactLabelApi.count().then(res => setContactLabelCount(res));
  }

  const loadContactEmailCount = () => {
    ContactEmailApi.count().then(res => setContactEmailCount(res));
  }

  const deleteAllData = () => {
    setError("")
    ResetDataApi.deleteAllData().then(res => {
      onClose();
      toast({
        title: "Success",
        description: "All data deleted successfully.",
        status: "success",
        position: "bottom-right",
      });
      loadSummary();
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error deleting all data",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const createCountries = () => {
    setError("");
    ResetDataApi.createCountries().then(res => {
      toast({
        title: "Success",
        description: "Default countries created successfully.",
        status: "success",
        position: "bottom-right",
      });
      loadSummary();
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error creating default countries",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const createContacts = () => {
    setError("");
    ResetDataApi.createContacts().then(res => {
      toast({
        title: "Success",
        description: "Default contacts created successfully.",
        status: "success",
        position: "bottom-right",
      });
      loadSummary();
    }).catch(error => {
      setError(error.response.data.error);
      toast({
        title: "Error creating default contacts",
        description: error.response.data.error,
        status: "error",
        position: "bottom-right",
      });
    })
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete All Data</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showSummary = () => (
    <div>
      <Text fontSize="xl">
        Summary of Data
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Countries</Th>
              <Td>
                <NumericFormat value={countryCount} displayType="text" thousandSeparator="," /> 
                {" "}Countries <br />
                <NumericFormat value={stateCount} displayType="text" thousandSeparator="," /> 
                {" "}States <br />
                <NumericFormat value={cityCount} displayType="text" thousandSeparator=","  />
                {" "}Cities
              </Td>
            </Tr>
            <Tr>
              <Th>Contacts</Th>
              <Td>
              <NumericFormat value={contactCount} displayType="text" thousandSeparator=","  />
                {" "}Contacts <br />
                <NumericFormat value={contactLabelCount} displayType="text" thousandSeparator=","  />
                {" "}Labels <br />
                <NumericFormat value={contactEmailCount} displayType="text" thousandSeparator=","  />
                {" "}Emails <br />
                <NumericFormat value={contactPhoneCount} displayType="text" thousandSeparator=","  />
                {" "}Phones <br />
                <NumericFormat value={contactAddressCount} displayType="text" thousandSeparator=","  />
                {" "}Addresses <br />
                <NumericFormat value={contactWebsiteCount} displayType="text" thousandSeparator=","  />
                {" "}Websites <br />
                <NumericFormat value={contactChatCount} displayType="text" thousandSeparator=","  />
                {" "}Chats</Td>
            </Tr>
            <Tr>
              <Th>Labels</Th>
              <Td>
                {labelCount} Labels <br />
                {emailLabelCount} Email Labels <br />
                {phoneLabelCount} Phone Labels <br />
                {addressLabelCount} Address Labels <br />
                {websiteLabelCount} Website Labels <br />
                {chatLabelCount} Chat Labels
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      {(false) && <AlertBox title="Cannot Delete Label" description={"It has contacts."} />}
      <HStack pt={4} spacing={4}>
        <Button onClick={createCountries} type="button" colorScheme={"blue"}>
          Create Countries
        </Button>
        <Button onClick={createContacts} type="button" colorScheme={"blue"}>
          Create Contacts
        </Button>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          DELETE ALL DATA
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
            Delete All Data
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteAllData} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete All Data</Button>
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
        {showSummary()}
        {showAlertDialog()}
      </Stack>
    </Box>
  )
}

export default ResetData