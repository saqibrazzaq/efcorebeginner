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
import { LabelReqEdit } from "../../dtos/Label";
import { LabelApi } from "../../api/labelApi";

const LabelEdit = () => {
  const params = useParams();
  const labelId = params.labelId;
  const updateText = labelId ? "Update Label" : "Add Label";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [label, setLabel] = useState<LabelReqEdit>(new LabelReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadLabel();
  }, [labelId]);

  const loadLabel = () => {
    setError("");
    if (labelId) {
      LabelApi.get(labelId)
        .then((res) => {
          setLabel(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Label",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(20),
  });

  const submitForm = (values: LabelReqEdit) => {
    // console.log(values);
    if (labelId) {
      updateLabel(values);
    } else {
      createLabel(values);
    }
  };

  const updateLabel = (values: LabelReqEdit) => {
    setError("");
    LabelApi.update(labelId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "label updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createLabel = (values: LabelReqEdit) => {
    setError("");
    LabelApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "label created successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate("/settings/labels");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={label}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
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

export default LabelEdit