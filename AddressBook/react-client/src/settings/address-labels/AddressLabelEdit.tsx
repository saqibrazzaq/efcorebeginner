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
import { AddressLabelReqEdit } from "../../dtos/AddressLabel";
import { AddressLabelApi } from "../../api/addressLabelApi";

const AddressLabelEdit = () => {
  const params = useParams();
  const addressLabelId = params.addressLabelId;
  const updateText = addressLabelId ? "Update Address Label" : "Add Address Label";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [addressLabel, setAddressLabel] = useState<AddressLabelReqEdit>(new AddressLabelReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadAddressLabel();
  }, [addressLabelId]);

  const loadAddressLabel = () => {
    setError("");
    if (addressLabelId) {
      AddressLabelApi.get(addressLabelId)
        .then((res) => {
          setAddressLabel(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Address Label",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    label: Yup.string().required("Label is required").max(20),
  });

  const submitForm = (values: AddressLabelReqEdit) => {
    // console.log(values);
    if (addressLabelId) {
      updateAddressLabel(values);
    } else {
      createAddressLabel(values);
    }
  };

  const updateAddressLabel = (values: AddressLabelReqEdit) => {
    setError("");
    AddressLabelApi.update(addressLabelId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Address label updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/address-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createAddressLabel = (values: AddressLabelReqEdit) => {
    setError("");
    AddressLabelApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Address label created successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/address-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={addressLabel}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.label && touched.label}>
                <FormLabel htmlFor="label">Label</FormLabel>
                <Field as={Input} id="label" name="label" type="text" />
                <FormErrorMessage>{errors.label}</FormErrorMessage>
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

export default AddressLabelEdit