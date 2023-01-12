import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Spacer, Stack, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { CountryApi } from "../../api/countryApi";
import { CountryReqEdit } from "../../dtos/Country";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { AlertBox } from "../../utility/Alerts";

const CountryEdit = () => {
  const params = useParams();
  const countryId = params.countryId;
  const updateText = countryId ? "Update Country" : "Add Country";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [country, setCountry] = useState<CountryReqEdit>(new CountryReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadCountry();
  }, [countryId]);

  const loadCountry = () => {
    setError("");
    if (countryId) {
      CountryApi.get(countryId)
        .then((res) => {
          setCountry(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Country",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Country Name is required"),
    iso3: Yup.string().max(3).required("Iso3 code is required"),
    iso2: Yup.string().max(2).required("Iso2 code is required"),
  });

  const submitForm = (values: CountryReqEdit) => {
    // console.log(values);
    if (countryId) {
      updateCountry(values);
    } else {
      createCountry(values);
    }
  };

  const updateCountry = (values: CountryReqEdit) => {
    setError("");
    CountryApi.update(countryId, values).then((res) => {
      toast({
        title: "Success",
        description: "Country updated successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/countries");
    }).catch(error => {
      setError(error.response.data.error);
    });
  };

  const createCountry = (values: CountryReqEdit) => {
    setError("")
    CountryApi.create(values).then((res) => {
      toast({
        title: "Success",
        description: "Country created successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/countries");
    }).catch(error => {
      setError(error.response.data.error);
    });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={country}
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
                <FormLabel htmlFor="name">Country Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.iso3 && touched.iso3}>
                <FormLabel htmlFor="iso3">Iso3 code</FormLabel>
                <Field as={Input} id="iso3" name="iso3" type="text" />
                <FormErrorMessage>{errors.iso3}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.iso2 && touched.iso2}
              >
                <FormLabel htmlFor="iso2">Iso2 code</FormLabel>
                <Field
                  as={Input}
                  id="iso2"
                  name="iso2"
                  type="text"
                />
                <FormErrorMessage>{errors.iso2}</FormErrorMessage>
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
    <Box width={"100%"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {error && <AlertBox description={error} />}
        {showUpdateForm()}
      </Stack>
    </Box>
  );
}

export default CountryEdit