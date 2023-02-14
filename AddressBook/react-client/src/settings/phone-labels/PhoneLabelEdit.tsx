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
import { EmailLabelReqEdit } from "../../dtos/EmailLabel";
import { EmailLabelApi } from "../../api/emailLabelApi";
import { PhoneLabelReqEdit } from "../../dtos/PhoneLabel";
import { PhoneLabelApi } from "../../api/phoneLabelApi";

const PhoneLabelEdit = () => {
  const params = useParams();
  const phoneLabelId = params.phoneLabelId;
  const updateText = phoneLabelId ? "Update Phone Label" : "Add Phone Label";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [phoneLabel, setPhoneLabel] = useState<PhoneLabelReqEdit>(new PhoneLabelReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadPhoneLabel();
  }, [phoneLabelId]);

  const loadPhoneLabel = () => {
    setError("");
    if (phoneLabelId) {
      PhoneLabelApi.get(phoneLabelId)
        .then((res) => {
          setPhoneLabel(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Phone Label",
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

  const submitForm = (values: PhoneLabelReqEdit) => {
    // console.log(values);
    if (phoneLabelId) {
      updatePhoneLabel(values);
    } else {
      createPhoneLabel(values);
    }
  };

  const updatePhoneLabel = (values: PhoneLabelReqEdit) => {
    setError("");
    PhoneLabelApi.update(phoneLabelId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Phone label updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/phone-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createPhoneLabel = (values: PhoneLabelReqEdit) => {
    setError("");
    PhoneLabelApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Phone label created successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/phone-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={phoneLabel}
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

export default PhoneLabelEdit