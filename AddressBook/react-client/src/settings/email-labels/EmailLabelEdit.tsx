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

const EmailLabelEdit = () => {
  const params = useParams();
  const emailLabelId = params.emailLabelId;
  const updateText = emailLabelId ? "Update Email Label" : "Add Email Label";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [emailLabel, setEmailLabel] = useState<EmailLabelReqEdit>(new EmailLabelReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmailLabel();
  }, [emailLabelId]);

  const loadEmailLabel = () => {
    setError("");
    if (emailLabelId) {
      EmailLabelApi.get(emailLabelId)
        .then((res) => {
          setEmailLabel(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Email Label",
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

  const submitForm = (values: EmailLabelReqEdit) => {
    // console.log(values);
    if (emailLabelId) {
      updateEmailLabel(values);
    } else {
      createEmailLabel(values);
    }
  };

  const updateEmailLabel = (values: EmailLabelReqEdit) => {
    setError("");
    EmailLabelApi.update(emailLabelId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Email label updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/email-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createEmailLabel = (values: EmailLabelReqEdit) => {
    setError("");
    EmailLabelApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Email label created successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/email-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={emailLabel}
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

export default EmailLabelEdit