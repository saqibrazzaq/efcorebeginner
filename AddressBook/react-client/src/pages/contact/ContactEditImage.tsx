import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  Link,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { number } from "yup/lib/locale";
import { useDropzone } from "react-dropzone";
import { ContactApi } from "../../api/contactApi";
import ContactHeader from "./ContactHeader";

const ContactEditImage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const contactId = params.contactId;
  const toast = useToast();

  useEffect(() => {
    
  }, [contactId]);

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Update Profile Picture</Heading>
      </Box>
      <Spacer />
      <Box>
        
      </Box>
    </Flex>
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    ContactApi.updateImage(contactId, fd)
      .then((res) => {
        // console.log(res.data);
        successToast();
        navigate(-1);
        //acceptedFiles.splice(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successToast = () => {
    toast({
      title: "Image updated successfully",
      description: "",
      status: "success",
      position: "top-right",
    });
  };

  let fd = new FormData();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  acceptedFiles.map((file) => {
    fd.append("File[]", file);
  });

  const showUploadForm = () => (
    <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
      <FormControl>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Center width={500} height={200} backgroundColor={"gray.200"}>
            Click to select or Drag files here...
          </Center>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </FormControl>
      <Stack spacing={6}>
        <Button type="submit" colorScheme={"blue"}>Upload Profile Picture</Button>
      </Stack>
    </form>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        <ContactHeader contactId={contactId} />
        {showUploadForm()}
      </Stack>
    </Box>
  );
}

export default ContactEditImage