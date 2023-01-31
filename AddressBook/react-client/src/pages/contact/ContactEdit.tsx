import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link as RouteLink, } from "react-router-dom";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { AlertBox } from "../../utility/Alerts";
import { ContactReqEdit, ContactRes } from "../../dtos/Contact";
import { ContactApi } from "../../api/contactApi";
import UpdateIcon from "../../components/icons/UpdateIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import { ContactPhoneReqSearch, ContactPhoneRes } from "../../dtos/ContactPhone";
import PagedRes from "../../dtos/PagedRes";
import { ContactPhoneApi } from "../../api/contactPhone";
import AddIcon from "../../components/icons/AddIcon";
import { LabelRes } from "../../dtos/Label";
import { ContactLabelApi } from "../../api/contactLabelApi";
import { ContactLabelReqSearch, ContactLabelRes } from "../../dtos/ContactLabel";
import { ContactEmailReqSearch, ContactEmailRes } from "../../dtos/ContactEmail";
import { ContactEmailApi } from "../../api/contactEmail";
import { ContactWebsiteReqSearch, ContactWebsiteRes } from "../../dtos/ContactWebsite";
import { ContactWebsiteApi } from "../../api/contactWebsiteApi";
import { ContactChatReqSearch, ContactChatRes } from "../../dtos/ContactChat";
import { ContactChatApi } from "../../api/contactChatApi";
import { ContactAddressReqSearch, ContactAddressRes } from "../../dtos/ContactAddress";
import { ContactAddressApi } from "../../api/contactAddressApi";
import { PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";

const ContactEdit = () => {
  const params = useParams();
  const contactId = Number.parseInt(params.contactId || "0");
  const updateText = contactId ? "Update Contact" : "Add Contact";

  const [contact, setContact] = useState<ContactReqEdit>(new ContactReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const fontSize = "sm";

  const [contactPhonesPaged, setContactPhonesPaged] = useState<PagedRes<ContactPhoneRes>>();
  const [contactLabelsPaged, setContactLabelsPaged] = useState<PagedRes<ContactLabelRes>>();
  const [contactEmailsPaged, setContactEmailsPaged] = useState<PagedRes<ContactEmailRes>>();
  const [contactWebsitesPaged, setContactWebsitesPaged] = useState<PagedRes<ContactWebsiteRes>>();
  const [contactChatsPaged, setContactChatsPaged] = useState<PagedRes<ContactChatRes>>();
  const [contactAddressesPaged, setContactAddressesPaged] = useState<PagedRes<ContactAddressRes>>();

  // console.log("countryid: " + countryId);
  // console.log("state id: " + stateId);

  useEffect(() => {
    loadContact();
    loadContactPhones();
    loadContactLabels();
    loadContactEmails();
    loadContactWebsites();
    loadContactChats();
    loadContactAddresses();
  }, [contactId]);

  const loadContactPhones = () => {
    ContactPhoneApi.search(new ContactPhoneReqSearch({}, {contactId: contactId.toString()})).then(res => {
      setContactPhonesPaged(res)
    })
  }

  const loadContactLabels = () => {
    ContactLabelApi.search(new ContactLabelReqSearch({}, {contactId: contactId.toString()})).then(res => {
      setContactLabelsPaged(res)
      // console.log(res)
    })
  }

  const loadContactEmails = () => {
    ContactEmailApi.search(new ContactEmailReqSearch({}, {contactId: contactId.toString()})).then(res => {
      setContactEmailsPaged(res);
    })
  }

  const loadContactWebsites = () => {
    ContactWebsiteApi.search(new ContactWebsiteReqSearch({}, {contactId: contactId.toString()})).then(res => {
      setContactWebsitesPaged(res)
    })
  }

  const loadContactChats = () => {
    ContactChatApi.search(new ContactChatReqSearch({}, {contactId: contactId.toString()})).then(res => {
      setContactChatsPaged(res);
    })
  }

  const loadContactAddresses = () => {
    ContactAddressApi.search(new ContactAddressReqSearch({}, {contactId: contactId.toString()})).then(res => {
      setContactAddressesPaged(res)
    })
  }

  const loadContact = () => {
    setError("");
    if (contactId) {
      ContactApi.get(contactId)
        .then((res) => {
          setContact(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Contact",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string(),
    pictureUrl: Yup.string(),
    company: Yup.string(),
    jobTitle: Yup.string(),
    department: Yup.string(),
    dateOfBirth: Yup.date(),
    notes: Yup.string(),
  });

  const submitForm = (values: ContactReqEdit) => {
    // console.log("submit form")
    // console.log(values);
    if (contactId) {
      updateContact(values);
    } else {
      createContact(values);
    }
  };

  const updateContact = (values: ContactReqEdit) => {
    setError("");
    ContactApi.update(contactId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createContact = (values: ContactReqEdit) => {
    setError("");
    ContactApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact created successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={contact}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.pictureUrl && touched.pictureUrl}>
                <Flex >
                  <Center >
                  <Link as={RouteLink} to={"/contacts/profilePicture/" + contactId}>
                    <Avatar size={"2xl"} src={contact.pictureUrl} />
                  </Link>
                  </Center>
                  <Center>
                  <VStack ml={10} alignItems={"start"}>
                    <Text fontSize={"3xl"}>{contact.firstName + " " + contact.lastName}</Text>
                    <Text fontSize={"lg"}>{contact.jobTitle} - {contact.company}</Text>
                    <HStack>
                      {
                        contactLabelsPaged?.pagedList?.map(item => (
                          <Tag size={"lg"} borderRadius='full' variant='outline'>
                            <TagLabel>{item?.label?.name}</TagLabel>
                          </Tag>
                        ))
                      }
                    </HStack>
                  </VStack>
                  </Center>
                </Flex>
                <Field as={Input} id="pictureUrl" name="pictureUrl" type="hidden" />
                <FormErrorMessage>{errors.pictureUrl}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="First Name" />
                <Field as={Input} id="firstName" name="firstName" type="text" />
                </InputGroup>
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.middleName && touched.middleName}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="Middle Name" />
                <Field as={Input} id="middleName" name="middleName" type="text" />
                </InputGroup>
                <FormErrorMessage>{errors.middleName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="Last Name" />
                <Field as={Input} id="lastName" name="lastName" type="text" />
                </InputGroup>
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.company && touched.company}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="Company" />
                <Field as={Input} id="company" name="company" type="text" />
                </InputGroup>
                <FormErrorMessage>{errors.company}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.jobTitle && touched.jobTitle}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="Job Title" />
                <Field as={Input} id="jobTitle" name="jobTitle" type="text" />
                </InputGroup>
                <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.department && touched.department}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="Department" />
                <Field as={Input} id="department" name="department" type="text" />
                </InputGroup>
                <FormErrorMessage>{errors.department}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.dateOfBirth && touched.dateOfBirth}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="Date of Birth" />
                <Field as={Input} id="dateOfBirth" name="dateOfBirth" type="datetime-local" />
                </InputGroup>
                <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.notes && touched.notes}>
                <InputGroup size={fontSize}>
                <InputLeftAddon children="Notes" />
                <Field as={Input} id="notes" name="notes" type="text" />
                </InputGroup>
                <FormErrorMessage>{errors.notes}</FormErrorMessage>
              </FormControl>
              <Stack direction={"row"} spacing={6}>
                <Button type="submit" colorScheme={"blue"}>
                  {updateText}
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  const showContactPhones = () => (
    <Flex>
      <Box>
        {/* <Heading fontSize={fontSize} mb={2} >Phones</Heading> */}
        <HStack>
        <Heading fontSize={fontSize} >Phones</Heading>
        <Link as={RouteLink} to={"/contacts/" + contactId + "/phones/edit"}>
          <AddIcon size="xs" fontSize="15" />
        </Link>
        </HStack>
        
      </Box>
      <Spacer />
      <Box>
      <TableContainer>
      <Table variant="simple" size={fontSize}>
        <Tbody>
          {contactPhonesPaged?.pagedList?.map((item) => (
            <Tr key={item.contactPhoneId}>
              <Td>{item.country?.phoneCode}</Td>
              <Td>{item.phone}</Td>
              <Td>{item.phoneLabel?.label}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/contacts/" + contactId + "/phones/edit/" + item.contactPhoneId}
                >
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/contacts/" + contactId + "/phones/delete/" + item.contactPhoneId}>
                  <DeleteIcon size="xs" fontSize="15" />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      </Box>
    </Flex>
  )

  const showContactEmails = () => (
    <Flex>
      <Box>
        <HStack>
        <Heading fontSize={fontSize} >Emails</Heading>
        <Link as={RouteLink} to={"/contacts/" + contactId + "/emails/edit"}>
          <AddIcon size="xs" fontSize="15" />
        </Link>
        </HStack>
      </Box>
      <Spacer />
      <Box>
      <TableContainer>
      <Table variant="simple" size={fontSize}>
        <Tbody>
          {contactEmailsPaged?.pagedList?.map((item) => (
            <Tr key={item.contactEmailId}>
              <Td>{item.email}</Td>
              <Td>{item.emailLabel?.label}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/contacts/" + contactId + "/emails/edit/" + item.contactEmailId}
                >
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/contacts/" + contactId + "/emails/delete/" + item.contactEmailId}>
                  <DeleteIcon size="xs" fontSize="15" />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      </Box>
    </Flex>
  )

  const showContactWebsites = () => (
    <Flex>
      <Box>
        <HStack>
        <Heading fontSize={fontSize} >Websites</Heading>
        <Link as={RouteLink} to={"/contacts/" + contactId + "/websites/edit"}>
          <AddIcon size="xs" fontSize="15" />
        </Link>
        </HStack>
      </Box>
      <Spacer />
      <Box>
      <TableContainer>
      <Table variant="simple" size={fontSize}>
        <Tbody>
          {contactWebsitesPaged?.pagedList?.map((item) => (
            <Tr key={item.contactWebsiteId}>
              <Td>{item.website}</Td>
              <Td>{item.websiteLabel?.label}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/contacts/" + contactId + "/websites/edit/" + item.contactWebsiteId}
                >
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/contacts/" + contactId + "/websites/delete/" + item.contactWebsiteId}>
                  <DeleteIcon size="xs" fontSize="15" />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      </Box>
    </Flex>
  )

  const showContactChats = () => (
    <Flex>
      <Box>
        <HStack>
        <Heading fontSize={fontSize} >Chats</Heading>
        <Link as={RouteLink} to={"/contacts/" + contactId + "/chats/edit"}>
          <AddIcon size="xs" fontSize="15" />
        </Link>
        </HStack>
      </Box>
      <Spacer />
      <Box>
      <TableContainer>
      <Table variant="simple" size={fontSize}>
        <Tbody>
          {contactChatsPaged?.pagedList?.map((item) => (
            <Tr key={item.contactChatId}>
              <Td>{item.chat}</Td>
              <Td>{item.chatLabel?.label}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/contacts/" + contactId + "/chats/edit/" + item.contactChatId}
                >
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/contacts/" + contactId + "/chats/delete/" + item.contactChatId}>
                  <DeleteIcon size="xs" fontSize="15" />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      </Box>
    </Flex>
  )

  const showContactAddresses = () => (
    <Flex>
      <Box>
        <HStack>
        <Heading fontSize={fontSize} >Addresses</Heading>
        <Link as={RouteLink} to={"/contacts/" + contactId + "/addresses/edit"}>
          <AddIcon size="xs" fontSize="15" />
        </Link>
        </HStack>
      </Box>
      <Spacer />
      <Box>
      <TableContainer>
      <Table variant="simple" size={fontSize}>
        <Tbody>
          {contactAddressesPaged?.pagedList?.map((item) => (
            <Tr key={item.contactAddressId}>
              <Td>
                {item.line1}<br />
                {item.line2}
                {item.line2 ? <br /> : ''}
                {item.city?.name + ", " + item.city?.state?.name + ", " +
                item.city?.state?.country?.name}
              </Td>
              <Td>{item.addressLabel?.label}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/contacts/" + contactId + "/addresses/edit/" + item.contactAddressId}
                >
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/contacts/" + contactId + "/addresses/delete/" + item.contactAddressId}>
                  <DeleteIcon size="xs" fontSize="15" />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      </Box>
    </Flex>
  )

  const showContactLabels = () => (
    <Flex>
      <Box>
        <HStack>
        <Heading fontSize={fontSize} >Labels</Heading>
        <Link as={RouteLink} to={"/contacts/" + contactId + "/labels/edit"}>
          <AddIcon size="xs" fontSize="15" />
        </Link>
        </HStack>
      </Box>
      <Spacer />
      <Box>
      <TableContainer>
      <Table variant="simple" size={fontSize}>
        <Tbody>
          {contactLabelsPaged?.pagedList?.map((item) => (
            <Tr key={item.contactLabelId}>
              <Td>{item.label?.name}</Td>
              <Td>
                <Link
                  mr={2}
                  as={RouteLink}
                  to={"/contacts/" + contactId + "/labels/edit/" + item.contactLabelId}
                >
                  <UpdateIcon size="xs" fontSize="15" />
                </Link>
                <Link as={RouteLink} to={"/contacts/" + contactId + "/labels/delete/" + item.contactLabelId}>
                  <DeleteIcon size="xs" fontSize="15" />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      </Box>
    </Flex>
  )

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>{updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  return (
    <Box fontSize={"md"} width={"2xl"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {error && <AlertBox description={error} />}
        {showUpdateForm()}
        {contactId && showContactPhones()}
        {contactId && showContactLabels()}
        {contactId && showContactEmails()}
        {contactId && showContactWebsites()}
        {contactId && showContactChats()}
        {contactId && showContactAddresses()}
      </Stack>
    </Box>
  );
}

export default ContactEdit