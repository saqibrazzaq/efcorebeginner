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
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateApi } from "../../api/stateApi";
import { StateReqEdit } from "../../dtos/State";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { AlertBox } from "../../utility/Alerts";
import CountryDropdown from "../../dropdowns/CountryDropdown";
import { CountryRes, CountryReqEdit } from "../../dtos/Country";
import { CountryApi } from "../../api/countryApi";
import { TimezoneReqEdit } from "../../dtos/Timezone";
import { TimezoneApi } from "../../api/TimezoneApi";
import { TranslationReqEdit } from "../../dtos/Translation";
import { TranslationApi } from "../../api/translationApi";

const TranslationEdit = () => {
  const params = useParams();
  const countryId = params.countryId;
  const translationId = params.translationId;
  const updateText = translationId ? "Update Translation" : "Add Translation";

  const [selectedCountry, setSelectedCountry] = useState<CountryRes>();
  const [translation, setTranslation] = useState<TranslationReqEdit>(new TranslationReqEdit(countryId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // console.log("countryid: " + countryId);
  // console.log("state id: " + stateId);

  useEffect(() => {
    loadTranslation();
  }, [translationId]);

  useEffect(() => {
    loadCountry(countryId);
  }, [countryId]);

  useEffect(() => {
    loadCountry(translation.countryId);
  }, [translation.countryId]);

  const loadCountry = (cid?: string) => {
    CountryApi.get(cid).then((res) => {
      setSelectedCountry(res);
    });
  };

  const loadTranslation = () => {
    setError("");
    if (translationId) {
      TranslationApi.get(translationId)
        .then((res) => {
          setTranslation(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Translation",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
    countryId: Yup.number().required().min(1, "Please select country"),
  });

  const submitForm = (values: TranslationReqEdit) => {
    // console.log(values);
    if (translationId) {
      updateTranslation(values);
    } else {
      createTranslation(values);
    }
  };

  const updateTranslation = (values: TranslationReqEdit) => {
    setError("");
    TranslationApi.update(translationId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Translation updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createTranslation = (values: TranslationReqEdit) => {
    setError("");
    TranslationApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Translation created successfully.",
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
        initialValues={translation}
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
                <Field
                  as={Input}
                  id="countryId"
                  name="countryId"
                  type="hidden"
                />
                <CountryDropdown
                  selectedCountry={selectedCountry}
                  handleChange={(newValue?: CountryRes) => {
                    setSelectedCountry(newValue);
                    setFieldValue("countryId", newValue?.countryId || "");
                  }}
                />
                <FormErrorMessage>{errors.countryId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.code && touched.code}>
                <FormLabel htmlFor="code">Code</FormLabel>
                <Field as={Input} id="code" name="code" type="text" />
                <FormErrorMessage>{errors.code}</FormErrorMessage>
              </FormControl>
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

export default TranslationEdit