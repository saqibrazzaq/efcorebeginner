import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { AlertBox } from "../../utility/Alerts";
import { ContactChatReqEdit } from "../../dtos/ContactChat";
import { ChatLabelRes } from "../../dtos/ChatLabel";
import { ContactChatApi } from "../../api/contactChatApi";
import ChatLabelDropdown from "../../dropdowns/ChatLabelDropdown";

const ContactChatEdit = () => {
  const params = useParams();
  const contactChatId = params.contactChatId;
  const contactId = Number.parseInt(params.contactId || "0");
  const updateText = contactChatId ? "Update Chat" : "Add Chat";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [contactChat, setContactChat] = useState<ContactChatReqEdit>(new ContactChatReqEdit(contactId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [selectedChatLabel, setSelectedChatLabel] = useState<ChatLabelRes>();

  useEffect(() => {
    loadContactChat();
  }, [contactChatId]);

  const loadContactChat = () => {
    setError("");
    if (contactChatId) {
      ContactChatApi.get(contactChatId)
        .then((res) => {
          setContactChat(res);
          setSelectedChatLabel(res.chatLabel)
          // console.log(res)
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Contact Chat",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    chat: Yup.string().required("Chat is required"),
    contactId: Yup.number().required().min(1),
    chatLabelId: Yup.number().required().min(1),
  });

  const submitForm = (values: ContactChatReqEdit) => {
    // console.log(values);
    if (contactChatId) {
      updateContactChat(values);
    } else {
      createContactChat(values);
    }
  };

  const updateContactChat = (values: ContactChatReqEdit) => {
    setError("");
    ContactChatApi.update(contactChatId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact chat updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createContactChat = (values: ContactChatReqEdit) => {
    setError("");
    ContactChatApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact chat created successfully.",
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
        initialValues={contactChat}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.chat && touched.chat}>
                <FormLabel htmlFor="chat">Chat</FormLabel>
                <Field as={Input} id="contactId" name="contactId" type="hidden" />
                <Field as={Input} id="chat" name="chat" type="text" />
                <FormErrorMessage>{errors.chat}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.chatLabelId && touched.chatLabelId}>
                <FormLabel htmlFor="chatLabelId">Chat Label</FormLabel>
                <Field as={Input} id="chatLabelId" name="chatLabelId" type="hidden"
                />
                <ChatLabelDropdown
                  selectedChatLabel={selectedChatLabel}
                  handleChange={(newValue?: ChatLabelRes) => {
                    setSelectedChatLabel(newValue);
                    setFieldValue("chatLabelId", newValue?.chatLabelId || "");
                  }}
                />
                <FormErrorMessage>{errors.chatLabelId}</FormErrorMessage>
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
    <Box width={"lg"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {error && <AlertBox description={error} />}
        {showUpdateForm()}
      </Stack>
    </Box>
  );
}

export default ContactChatEdit