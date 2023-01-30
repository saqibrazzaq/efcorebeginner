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
import { ContactAddressReqEdit } from "../../dtos/ContactAddress";
import { AddressLabelRes } from "../../dtos/AddressLabel";
import { ContactAddressApi } from "../../api/contactAddressApi";
import CityDropdown from "../../dropdowns/CityDropdown";
import { CityRes } from "../../dtos/City";
import AddressLabelDropdown from "../../dropdowns/AddressLabelDropdown";

const ContactAddressEdit = () => {
  const params = useParams();
  const contactAddressId = params.contactAddressId;
  const contactId = Number.parseInt(params.contactId || "0");
  const updateText = contactAddressId ? "Update Address" : "Add Address";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [contactAddress, setContactAddress] = useState<ContactAddressReqEdit>(new ContactAddressReqEdit(contactId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [selectedAddressLabel, setSelectedAddressLabel] = useState<AddressLabelRes>();
  const [selectedCity, setSelectedCity] = useState<CityRes>();

  useEffect(() => {
    loadContactAddress();
  }, [contactAddressId]);

  const loadContactAddress = () => {
    setError("");
    if (contactAddressId) {
      ContactAddressApi.get(contactAddressId)
        .then((res) => {
          setContactAddress(res);
          setSelectedAddressLabel(res.addressLabel)
          setSelectedCity(res.city)
          // console.log(res)
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Contact Address",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    line1: Yup.string().required("Line1 is required"),
    line2: Yup.string(),
    postCode: Yup.string(),
    contactId: Yup.number().required().min(1),
    addressLabelId: Yup.number().required().min(1),
    cityId: Yup.number().required().min(1),
  });

  const submitForm = (values: ContactAddressReqEdit) => {
    // console.log(values);
    if (contactAddressId) {
      updateContactAddress(values);
    } else {
      createContactAddress(values);
    }
  };

  const updateContactAddress = (values: ContactAddressReqEdit) => {
    setError("");
    ContactAddressApi.update(contactAddressId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact address updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createContactAddress = (values: ContactAddressReqEdit) => {
    setError("");
    ContactAddressApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Contact address created successfully.",
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
        initialValues={contactAddress}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.line1 && touched.line1}>
                <FormLabel htmlFor="line1">Line 1</FormLabel>
                <Field as={Input} id="contactId" name="contactId" type="hidden" />
                <Field as={Input} id="line1" name="line1" type="text" />
                <FormErrorMessage>{errors.line1}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.line2 && touched.line2}>
                <FormLabel htmlFor="line2">Line 2</FormLabel>
                <Field as={Input} id="line2" name="line2" type="text" />
                <FormErrorMessage>{errors.line2}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.cityId && touched.cityId}>
                <FormLabel htmlFor="cityId">City</FormLabel>
                <Field as={Input} id="cityId" name="cityId" type="hidden"
                />
                <CityDropdown
                  selectedCity={selectedCity}
                  handleChange={(newValue?: CityRes) => {
                    setSelectedCity(newValue);
                    setFieldValue("cityId", newValue?.cityId || "");
                  }}
                />
                <FormErrorMessage>{errors.cityId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.postCode && touched.postCode}>
                <FormLabel htmlFor="postCode">Post Code</FormLabel>
                <Field as={Input} id="postCode" name="postCode" type="text" />
                <FormErrorMessage>{errors.postCode}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.addressLabelId && touched.addressLabelId}>
                <FormLabel htmlFor="addressLabelId">Address Label</FormLabel>
                <Field as={Input} id="addressLabelId" name="addressLabelId" type="hidden"
                />
                <AddressLabelDropdown
                  selectedAddressLabel={selectedAddressLabel}
                  handleChange={(newValue?: AddressLabelRes) => {
                    setSelectedAddressLabel(newValue);
                    setFieldValue("addressLabelId", newValue?.addressLabelId || "");
                  }}
                />
                <FormErrorMessage>{errors.addressLabelId}</FormErrorMessage>
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

export default ContactAddressEdit