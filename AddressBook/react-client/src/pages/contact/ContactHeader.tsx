import {
  Avatar,
  Center,
  Flex,
  HStack,
  Link,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ContactApi } from "../../api/contactApi";
import { ContactLabelApi } from "../../api/contactLabelApi";
import { ContactRes } from "../../dtos/Contact";
import {
  ContactLabelReqSearch,
  ContactLabelRes,
} from "../../dtos/ContactLabel";
import PagedRes from "../../dtos/PagedRes";
import { Link as RouteLink } from "react-router-dom";

interface ContactHeaderProps {
  contactId?: string;
}

const ContactHeader = ({ contactId = "" }: ContactHeaderProps) => {
  const [contact, setContact] = useState<ContactRes>();
  const [contactLabelsPaged, setContactLabelsPaged] =
    useState<PagedRes<ContactLabelRes>>();

  useEffect(() => {
    loadContact();
    loadContactLabels();
  }, [contactId]);

  const loadContact = () => {
    ContactApi.get(contactId).then((res) => {
      setContact(res);
    });
  };

  const loadContactLabels = () => {
    ContactLabelApi.search(
      new ContactLabelReqSearch({}, { contactId: contactId.toString() })
    ).then((res) => {
      setContactLabelsPaged(res);
      // console.log(res)
    });
  };

  return (
    <Flex>
      <Center>
        <Link as={RouteLink} to={"/contacts/profilePicture/" + contactId}>
          <Avatar size={"2xl"} src={contact?.pictureUrl} />
        </Link>
      </Center>
      <Center>
        <VStack ml={10} alignItems={"start"}>
          <Text fontSize={"3xl"}>
            {(contact?.firstName || "") + " " + (contact?.lastName || "")}
          </Text>
          <Text fontSize={"lg"}>
            {contact?.jobTitle} - {contact?.company}
          </Text>
          <HStack>
            {contactLabelsPaged?.pagedList?.map((item) => (
              <Tag
                key={item.contactLabelId}
                size={"lg"}
                borderRadius="full"
                variant="outline"
              >
                <TagLabel>{item?.label?.name}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </VStack>
      </Center>
    </Flex>
  );
};

export default ContactHeader;
