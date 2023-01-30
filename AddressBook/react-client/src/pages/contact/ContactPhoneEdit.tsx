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
import { ContactPhoneReqEdit } from "../../dtos/ContactPhone";
import { ContactPhoneApi } from "../../api/contactPhone";
import CountryDropdown from "../../dropdowns/CountryDropdown";
import { CountryRes } from "../../dtos/Country";
import { ContactRes } from "../../dtos/Contact";
import { PhoneLabelRes } from "../../dtos/PhoneLabel";
import PhoneLabelDropdown from "../../dropdowns/PhoneLabelDropdown";

const ContactPhoneEdit = () => {
  const params = useParams();
  const contactPhoneId = params.contactPhoneId;
  const contactId = Number.parseInt(params.contactId || "0");
  const updateText = contactPhoneId ? "Update Phone" : "Add Phone";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [contactPhone, setContactPhone] = useState<ContactPhoneReqEdit>(new ContactPhoneReqEdit(contactId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<CountryRes>();
  const [selectedPhoneLabel, setSelectedPhoneLabel] = useState<PhoneLabelRes>();

  useEffect(() => {
    loadContactPhone();
  }, [contactPhoneId]);

  const loadContactPhone = () => {
    setError("");
    if (contactPhoneId) {
      ContactPhoneApi.get(contactPhoneId)
        .then((res) => {
          setContactPhone(res);
          setSelectedCountry(res.country)
          setSelectedPhoneLabel(res.phoneLabel)
          // console.log(res)
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Contact Phone",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    phone: Yup.string().required("Phone is required"),
    countryId: Yup.number().required().min(1),
    contactId: Yup.number().required().min(1),
    phoneLabelId: Yup.number().required().min(1),
  });

  const submitForm = (values: ContactPhoneReqEdit) => {
    // console.log(values);
    if (contactPhoneId) {
      updateContactPhone(values);
    } else {
      createContactPhone(values);
    }
  };

  const updateContactPhone = (values: ContactPhoneReqEdit) => {
    setError("");
    ContactPhoneApi.update(contactPhoneId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact phone updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createContactPhone = (values: ContactPhoneReqEdit) => {
    setError("");
    ContactPhoneApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact phone created successfully.",
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
        initialValues={contactPhone}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.countryId && touched.countryId}>
                <FormLabel htmlFor="countryId">Country Id</FormLabel>
                <Field as={Input} id="contactId" name="contactId" type="text" />
                <Field as={Input} id="countryId" name="countryId" type="hidden" />
                <CountryDropdown
                  selectedCountry={selectedCountry}
                  handleChange={(newValue?: CountryRes) => {
                    setSelectedCountry(newValue);
                    setFieldValue("countryId", newValue?.countryId || "");
                  }}
                />
                <FormErrorMessage>{errors.countryId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.phone && touched.phone}>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Field as={Input} id="phone" name="phone" type="text" />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.phoneLabelId && touched.phoneLabelId}>
                <FormLabel htmlFor="phoneLabelId">Phone Label</FormLabel>
                <Field as={Input} id="phoneLabelId" name="phoneLabelId" type="hidden"
                />
                <PhoneLabelDropdown
                  selectedPhoneLabel={selectedPhoneLabel}
                  handleChange={(newValue?: PhoneLabelRes) => {
                    setSelectedPhoneLabel(newValue);
                    setFieldValue("phoneLabelId", newValue?.phoneLabelId || "");
                  }}
                />
                <FormErrorMessage>{errors.phoneLabelId}</FormErrorMessage>
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

export default ContactPhoneEdit