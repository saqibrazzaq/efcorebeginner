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

const StateEdit = () => {
  const params = useParams();
  const countryId = params.countryId;
  const stateId = params.stateId;
  const updateText = stateId ? "Update State" : "Add State";

  const [selectedCountry, setSelectedCountry] = useState<CountryRes>();
  const [state, setState] = useState<StateReqEdit>(new StateReqEdit(countryId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // console.log("countryid: " + countryId);
  // console.log("state id: " + stateId);

  useEffect(() => {
    loadState();
  }, [stateId]);

  useEffect(() => {
    loadCountry(countryId);
  }, [countryId]);

  useEffect(() => {
    loadCountry(state.countryId);
  }, [state.countryId]);

  const loadCountry = (cid?: string) => {
    CountryApi.get(cid).then((res) => {
      setSelectedCountry(res);
    });
  };

  const loadState = () => {
    setError("");
    if (stateId) {
      StateApi.get(stateId)
        .then((res) => {
          setState(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get State",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("State Name is required"),
    code: Yup.string().required(),
    latitude: Yup.number(),
    longitude: Yup.number(),
    countryId: Yup.number().required().min(1, "Please select country"),
  });

  const submitForm = (values: StateReqEdit) => {
    // console.log(values);
    if (stateId) {
      updateState(values);
    } else {
      createState(values);
    }
  };

  const updateState = (values: StateReqEdit) => {
    setError("");
    StateApi.update(stateId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "State updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createState = (values: StateReqEdit) => {
    setError("");
    StateApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "State created successfully.",
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
        initialValues={state}
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
                <FormLabel htmlFor="name">State Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.code && touched.code}>
                <FormLabel htmlFor="code">Code</FormLabel>
                <Field as={Input} id="code" name="code" type="text" />
                <FormErrorMessage>{errors.code}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.latitude && touched.latitude}>
                <FormLabel htmlFor="latitude">Latitude</FormLabel>
                <Field as={Input} id="latitude" name="latitude" type="text" />
                <FormErrorMessage>{errors.latitude}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.longitude && touched.longitude}>
                <FormLabel htmlFor="longitude">Longitude</FormLabel>
                <Field as={Input} id="longitude" name="longitude" type="text" />
                <FormErrorMessage>{errors.longitude}</FormErrorMessage>
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
};

export default StateEdit;
