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
import { ContactLabelReqEdit } from "../../dtos/ContactLabel";
import { LabelRes } from "../../dtos/Label";
import { ContactLabelApi } from "../../api/contactLabelApi";
import LabelDropdown from "../../dropdowns/LabelDropdown";

const ContactLabelEdit = () => {
  const params = useParams();
  const contactLabelId = params.contactLabelId;
  const contactId = Number.parseInt(params.contactId || "0");
  const updateText = contactLabelId ? "Update Label" : "Add Label";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [contactLabel, setContactLabel] = useState<ContactLabelReqEdit>(new ContactLabelReqEdit(contactId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [selectedLabel, setSelectedLabel] = useState<LabelRes>();

  useEffect(() => {
    loadContactLabel();
  }, [contactLabelId]);

  const loadContactLabel = () => {
    setError("");
    if (contactLabelId) {
      ContactLabelApi.get(contactLabelId)
        .then((res) => {
          setContactLabel(res);
          setSelectedLabel(res.label)
          console.log(res)
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Contact Label",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    labelId: Yup.number().required().min(1),
    contactId: Yup.number().required().min(1),
  });

  const submitForm = (values: ContactLabelReqEdit) => {
    // console.log(values);
    if (contactLabelId) {
      updateContactLabel(values);
    } else {
      createContactLabel(values);
    }
  };

  const updateContactLabel = (values: ContactLabelReqEdit) => {
    setError("");
    ContactLabelApi.update(contactLabelId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact label updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createContactLabel = (values: ContactLabelReqEdit) => {
    setError("");
    ContactLabelApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact label created successfully.",
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
        initialValues={contactLabel}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.labelId && touched.labelId}>
                <FormLabel htmlFor="labelId">Label Id</FormLabel>
                <Field as={Input} id="contactId" name="contactId" type="text" />
                <Field as={Input} id="labelId" name="labelId" type="hidden" />
                <LabelDropdown
                  selectedLabel={selectedLabel}
                  handleChange={(newValue?: LabelRes) => {
                    setSelectedLabel(newValue);
                    setFieldValue("labelId", newValue?.labelId || "");
                  }}
                />
                <FormErrorMessage>{errors.labelId}</FormErrorMessage>
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

export default ContactLabelEdit