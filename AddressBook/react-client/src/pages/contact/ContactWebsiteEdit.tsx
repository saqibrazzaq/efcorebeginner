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
import { ContactWebsiteReqEdit } from "../../dtos/ContactWebsite";
import { WebsiteLabelRes } from "../../dtos/WebsiteLabel";
import { ContactWebsiteApi } from "../../api/contactWebsiteApi";
import WebsiteLabelDropdown from "../../dropdowns/WebsiteLabelDropdown";

const ContactWebsiteEdit = () => {
  const params = useParams();
  const contactWebsiteId = params.contactWebsiteId;
  const contactId = Number.parseInt(params.contactId || "0");
  const updateText = contactWebsiteId ? "Update Website" : "Add Website";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [contactWebsite, setContactWebsite] = useState<ContactWebsiteReqEdit>(new ContactWebsiteReqEdit(contactId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [selectedWebsiteLabel, setSelectedWebsiteLabel] = useState<WebsiteLabelRes>();

  useEffect(() => {
    loadContactWebsite();
  }, [contactWebsiteId]);

  const loadContactWebsite = () => {
    setError("");
    if (contactWebsiteId) {
      ContactWebsiteApi.get(contactWebsiteId)
        .then((res) => {
          setContactWebsite(res);
          setSelectedWebsiteLabel(res.websiteLabel)
          // console.log(res)
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Contact Website",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    website: Yup.string().required("Website is required"),
    contactId: Yup.number().required().min(1),
    websiteLabelId: Yup.number().required().min(1),
  });

  const submitForm = (values: ContactWebsiteReqEdit) => {
    // console.log(values);
    if (contactWebsiteId) {
      updateContactWebsite(values);
    } else {
      createContactWebsite(values);
    }
  };

  const updateContactWebsite = (values: ContactWebsiteReqEdit) => {
    setError("");
    ContactWebsiteApi.update(contactWebsiteId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact website updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createContactWebsite = (values: ContactWebsiteReqEdit) => {
    setError("");
    ContactWebsiteApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact website created successfully.",
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
        initialValues={contactWebsite}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.website && touched.website}>
                <FormLabel htmlFor="website">Website</FormLabel>
                <Field as={Input} id="contactId" name="contactId" type="text" />
                <Field as={Input} id="website" name="website" type="text" />
                <FormErrorMessage>{errors.website}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.websiteLabelId && touched.websiteLabelId}>
                <FormLabel htmlFor="websiteLabelId">Website Label</FormLabel>
                <Field as={Input} id="websiteLabelId" name="websiteLabelId" type="hidden"
                />
                <WebsiteLabelDropdown
                  selectedWebsiteLabel={selectedWebsiteLabel}
                  handleChange={(newValue?: WebsiteLabelRes) => {
                    setSelectedWebsiteLabel(newValue);
                    setFieldValue("websiteLabelId", newValue?.websiteLabelId || "");
                  }}
                />
                <FormErrorMessage>{errors.websiteLabelId}</FormErrorMessage>
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

export default ContactWebsiteEdit