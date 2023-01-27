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
import { WebsiteLabelReqEdit } from "../../dtos/WebsiteLabel";
import { WebsiteLabelApi } from "../../api/websiteLabelApi";

const WebsiteLabelEdit = () => {
  const params = useParams();
  const websiteLabelId = params.websiteLabelId;
  const updateText = websiteLabelId ? "Update Website Label" : "Add Website Label";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [websiteLabel, setWebsiteLabel] = useState<WebsiteLabelReqEdit>(new WebsiteLabelReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadWebsiteLabel();
  }, [websiteLabelId]);

  const loadWebsiteLabel = () => {
    setError("");
    if (websiteLabelId) {
      WebsiteLabelApi.get(websiteLabelId)
        .then((res) => {
          setWebsiteLabel(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Website Label",
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

  const submitForm = (values: WebsiteLabelReqEdit) => {
    // console.log(values);
    if (websiteLabelId) {
      updateWebsiteLabel(values);
    } else {
      createWebsiteLabel(values);
    }
  };

  const updateWebsiteLabel = (values: WebsiteLabelReqEdit) => {
    setError("");
    WebsiteLabelApi.update(websiteLabelId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Website label updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/website-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createWebsiteLabel = (values: WebsiteLabelReqEdit) => {
    setError("");
    WebsiteLabelApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Website label created successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/website-labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={websiteLabel}
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

export default WebsiteLabelEdit