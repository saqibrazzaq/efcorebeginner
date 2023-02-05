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
import { ContactEmailReqEdit } from "../../dtos/ContactEmail";
import { EmailLabelRes } from "../../dtos/EmailLabel";
import { ContactEmailApi } from "../../api/contactEmail";
import EmailLabelDropdown from "../../dropdowns/EmailLabelDropdown";
import ContactHeader from "./ContactHeader";

const ContactEmailEdit = () => {
  const params = useParams();
  const contactEmailId = params.contactEmailId;
  const contactId = params.contactId;
  const updateText = contactEmailId ? "Update Email" : "Add Email";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [contactEmail, setContactEmail] = useState<ContactEmailReqEdit>(new ContactEmailReqEdit(contactId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [selectedEmailLabel, setSelectedEmailLabel] = useState<EmailLabelRes>();

  useEffect(() => {
    loadContactEmail();
  }, [contactEmailId]);

  const loadContactEmail = () => {
    setError("");
    if (contactEmailId) {
      ContactEmailApi.get(contactEmailId)
        .then((res) => {
          setContactEmail(res);
          setSelectedEmailLabel(res.emailLabel)
          // console.log(res)
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Contact Email",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email(),
    contactId: Yup.number().required().min(1),
    emailLabelId: Yup.number(),
  });

  const submitForm = (values: ContactEmailReqEdit) => {
    values = convertEmptyStringToNull(values);
    // console.log(values);
    if (contactEmailId) {
      updateContactEmail(values);
    } else {
      createContactEmail(values);
    }
  };

  const updateContactEmail = (values: ContactEmailReqEdit) => {
    setError("");
    ContactEmailApi.update(contactEmailId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact email updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createContactEmail = (values: ContactEmailReqEdit) => {
    setError("");
    ContactEmailApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact email created successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const convertNullToEmptyString = (obj: ContactEmailReqEdit) => {
    obj.emailLabelId ??= "";
    return obj;
  }

  const convertEmptyStringToNull = (obj: ContactEmailReqEdit) => {
    obj.emailLabelId = obj.emailLabelId == "" ? undefined : obj.emailLabelId;
    return obj;
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={convertNullToEmptyString(contactEmail)}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field as={Input} id="contactId" name="contactId" type="hidden" />
                <Field as={Input} id="email" name="email" type="text" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.emailLabelId && touched.emailLabelId}>
                <FormLabel htmlFor="emailLabelId">Email Label</FormLabel>
                <Field as={Input} id="emailLabelId" name="emailLabelId" type="hidden"
                />
                <EmailLabelDropdown
                  selectedEmailLabel={selectedEmailLabel}
                  handleChange={(newValue?: EmailLabelRes) => {
                    setSelectedEmailLabel(newValue);
                    setFieldValue("emailLabelId", newValue?.emailLabelId || "");
                  }}
                />
                <FormErrorMessage>{errors.emailLabelId}</FormErrorMessage>
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
        <ContactHeader contactId={contactId} />
        {showUpdateForm()}
      </Stack>
    </Box>
  );
}

export default ContactEmailEdit