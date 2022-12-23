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
import { PersonApi } from "../api/personApi";
import { PersonReqEdit } from "../dtos/Person";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import {AlertBox} from "../utility/Alerts"

const PersonEdit = () => {
  const params = useParams();
  const personId = params.personId;
  const updateText = personId ? "Update Person" : "Add Person";
  // console.log("person id: " + personId)
  // console.log(updateText)
  const [person, setPerson] = useState<PersonReqEdit>(new PersonReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadPerson();
  }, [personId]);

  const loadPerson = () => {
    setError("");
    if (personId) {
      PersonApi.get(personId)
        .then((res) => {
          setPerson(res);
        })
        .catch((error) => {
          setError(error.response.data.error);
          toast({
            title: "Failed to get Person",
            description: error.response.data.error,
            status: "error",
            position: "bottom-right",
          });
        });
    }
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required").max(100),
    lastName: Yup.string().required("Last Name is required").max(100),
    phoneNumber: Yup.string().max(20),
    gender: Yup.string().max(1),
  });

  const submitForm = (values: PersonReqEdit) => {
    // console.log(values);
    if (personId) {
      updatePerson(values);
    } else {
      createPerson(values);
    }
  };

  const updatePerson = (values: PersonReqEdit) => {
    setError("");
    PersonApi.update(personId, values).then((res) => {
      toast({
        title: "Success",
        description: "Person updated successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/persons");
    }).catch(error => {
      setError(error.response.data.error);
    });
  };

  const createPerson = (values: PersonReqEdit) => {
    setError("")
    PersonApi.create(values).then((res) => {
      toast({
        title: "Success",
        description: "Person created successfully.",
        status: "success",
        position: "bottom-right",
      });
      navigate("/persons");
    }).catch(error => {
      setError(error.response.data.error);
    });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={person}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Field as={Input} id="firstName" name="firstName" type="text" />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Field as={Input} id="lastName" name="lastName" type="text" />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.phoneNumber && touched.phoneNumber}
              >
                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <Field
                  as={Input}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                />
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.gender && touched.gender}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Field as={Input} id="gender" name="gender" type="text" />
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
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
        <Link ml={2} as={RouteLink} to={"/persons"}>
          <Button colorScheme={"gray"}>Back</Button>
        </Link>
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
};

export default PersonEdit;
