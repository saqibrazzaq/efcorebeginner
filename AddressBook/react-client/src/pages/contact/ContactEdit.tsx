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
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { AlertBox } from "../../utility/Alerts";
import { PersonReqEdit } from "../../dtos/Person";
import { PersonApi } from "../../api/personApi";

const ContactEdit = () => {
  const params = useParams();
  const personId = Number.parseInt(params.personId || "0");
  const updateText = personId ? "Update Person" : "Add Person";

  const [person, setPerson] = useState<PersonReqEdit>(new PersonReqEdit());
  const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // console.log("countryid: " + countryId);
  // console.log("state id: " + stateId);

  useEffect(() => {
    loadPerson();
  }, [personId]);

  const loadPerson = () => {
    setError("");
    if (personId) {
      PersonApi.get(personId)
        .then((res) => {
          setPerson(res);
          // console.log(res);
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
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string(),
    pictureUrl: Yup.string(),
    company: Yup.string(),
    jobTitle: Yup.string(),
    department: Yup.string(),
    dateOfBirth: Yup.date(),
    notes: Yup.string(),
  });

  const submitForm = (values: PersonReqEdit) => {
    // console.log("submit form")
    // console.log(values);
    if (personId) {
      updatePerson(values);
    } else {
      createPerson(values);
    }
  };

  const updatePerson = (values: PersonReqEdit) => {
    setError("");
    PersonApi.update(personId, values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Person updated successfully.",
          status: "success",
          position: "bottom-right",
        });
        navigate(-1);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const createPerson = (values: PersonReqEdit) => {
    setError("");
    PersonApi.create(values)
      .then((res) => {
        toast({
          title: "Success",
          description: "Person created successfully.",
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
              <FormControl isInvalid={!!errors.pictureUrl && touched.pictureUrl}>
                <FormLabel htmlFor="pictureUrl">Picture Url</FormLabel>
                <Field as={Input} id="pictureUrl" name="pictureUrl" type="text" />
                <FormErrorMessage>{errors.pictureUrl}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.firstName && touched.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Field as={Input} id="firstName" name="firstName" type="text" />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.middleName && touched.middleName}>
                <FormLabel htmlFor="middleName">Middle Name</FormLabel>
                <Field as={Input} id="middleName" name="middleName" type="text" />
                <FormErrorMessage>{errors.middleName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName && touched.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Field as={Input} id="lastName" name="lastName" type="text" />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.company && touched.company}>
                <FormLabel htmlFor="company">Company</FormLabel>
                <Field as={Input} id="company" name="company" type="text" />
                <FormErrorMessage>{errors.company}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.jobTitle && touched.jobTitle}>
                <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
                <Field as={Input} id="jobTitle" name="jobTitle" type="text" />
                <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.department && touched.department}>
                <FormLabel htmlFor="department">Department</FormLabel>
                <Field as={Input} id="department" name="department" type="text" />
                <FormErrorMessage>{errors.department}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.dateOfBirth && touched.dateOfBirth}>
                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                <Field as={Input} id="dateOfBirth" name="dateOfBirth" type="datetime-local" />
                <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.notes && touched.notes}>
                <FormLabel htmlFor="notes">Notes</FormLabel>
                <Field as={Input} id="notes" name="notes" type="text" />
                <FormErrorMessage>{errors.notes}</FormErrorMessage>
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

export default ContactEdit