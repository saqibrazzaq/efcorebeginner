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
import { StateReqEdit, StateRes } from "../../dtos/State";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { AlertBox } from "../../utility/Alerts";
import { CityReqEdit } from "../../dtos/City";
import { CityApi } from "../../api/cityApi";
import StateDropdown from "../../dropdowns/StateDropdown";

const CityEdit = () => {
  const params = useParams();
  const stateId = Number.parseInt(params.stateId || "0");
  const cityId = Number.parseInt(params.cityId || "0");
  const updateText = cityId ? "Update City" : "Add City";

  const [selectedState, setSelectedState] = useState<StateRes>();
  const [city, setCity] = useState<CityReqEdit>(new CityReqEdit(stateId));
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // console.log("countryid: " + countryId);
  // console.log("state id: " + stateId);

  useEffect(() => {
    loadCity();
  }, [cityId]);

  useEffect(() => {
    loadState(stateId);
  }, [stateId]);

  useEffect(() => {
    loadState(city.stateId);
  }, [city.stateId]);

  const loadState = (cid?: number) => {
    StateApi.get(cid).then((res) => {
      setSelectedState(res);
    });
  };

  const loadCity = () => {
    setError("");
    if (cityId) {
      CityApi.get(cityId)
        .then((res) => {
          setCity(res);
          // console.log(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get City",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("City Name is required"),
    latitude: Yup.number(),
    longitude: Yup.number(),
    stateId: Yup.number().required().min(1, "Please select state"),
  });

  const submitForm = (values: CityReqEdit) => {
    // console.log(values);
    if (cityId) {
      updateCity(values);
    } else {
      createCity(values);
    }
  };

  const updateCity = (values: CityReqEdit) => {
    setError("");
    CityApi.update(cityId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "City updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createCity = (values: CityReqEdit) => {
    setError("");
    CityApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "City created successfully.",
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
        initialValues={city}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.stateId && touched.stateId}>
                <FormLabel htmlFor="countryId">State Id</FormLabel>
                <Field
                  as={Input}
                  id="stateId"
                  name="stateId"
                  type="hidden"
                />
                <StateDropdown
                  selectedState={selectedState}
                  handleChange={(newValue?: StateRes) => {
                    setSelectedState(newValue);
                    setFieldValue("stateId", newValue?.stateId || "");
                  }}
                />
                <FormErrorMessage>{errors.stateId}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">City Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
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
}

export default CityEdit