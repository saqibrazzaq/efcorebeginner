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

const TimezoneEdit = () => {
  const params = useParams();
  const countryId = params.countryId;
  const timezoneId = params.timezoneId;
  const updateText = timezoneId ? "Update Timezone" : "Add Timezone";

  const [selectedCountry, setSelectedCountry] = useState<CountryRes>();
  const [timezone, setTimezone] = useState<TimezoneReqEdit>(new TimezoneReqEdit(countryId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // console.log("countryid: " + countryId);
  // console.log("state id: " + stateId);

  useEffect(() => {
    loadTimezone();
  }, [timezoneId]);

  useEffect(() => {
    loadCountry(countryId);
  }, [countryId]);

  useEffect(() => {
    loadCountry(timezone.countryId);
  }, [timezone.countryId]);

  const loadCountry = (cid?: string) => {
    CountryApi.get(cid).then((res) => {
      setSelectedCountry(res);
    });
  };

  const loadTimezone = () => {
    setError("");
    if (timezoneId) {
      TimezoneApi.get(timezoneId)
        .then((res) => {
          setTimezone(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Timezone",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Timezone Name is required"),
    cityName: Yup.string(),
    gmtOffset: Yup.number(),
    gmtOffsetName: Yup.string(),
    abbreviation: Yup.string(),
    countryId: Yup.number().required().min(1, "Please select country"),
  });

  const submitForm = (values: TimezoneReqEdit) => {
    // console.log(values);
    if (timezoneId) {
      updateTimezone(values);
    } else {
      createTimezone(values);
    }
  };

  const updateTimezone = (values: TimezoneReqEdit) => {
    setError("");
    TimezoneApi.update(timezoneId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Timezone updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createTimezone = (values: TimezoneReqEdit) => {
    setError("");
    TimezoneApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Timezone created successfully.",
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
        initialValues={timezone}
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
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Timezone Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.cityName && touched.cityName}>
                <FormLabel htmlFor="cityName">City Name</FormLabel>
                <Field as={Input} id="cityName" name="cityName" type="text" />
                <FormErrorMessage>{errors.cityName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.gmtOffset && touched.gmtOffset}>
                <FormLabel htmlFor="gmtOffset">GMT Offset</FormLabel>
                <Field as={Input} id="gmtOffset" name="gmtOffset" type="text" />
                <FormErrorMessage>{errors.gmtOffset}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.gmtOffsetName && touched.gmtOffsetName}>
                <FormLabel htmlFor="gmtOffsetName">GMT Offset Name</FormLabel>
                <Field as={Input} id="gmtOffsetName" name="gmtOffsetName" type="text" />
                <FormErrorMessage>{errors.gmtOffsetName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.abbreviation && touched.abbreviation}>
                <FormLabel htmlFor="abbreviation">Abbreviation</FormLabel>
                <Field as={Input} id="abbreviation" name="abbreviation" type="text" />
                <FormErrorMessage>{errors.abbreviation}</FormErrorMessage>
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

export default TimezoneEdit