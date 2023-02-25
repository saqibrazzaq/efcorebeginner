import { Box, Center, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {CgOrganisation} from 'react-icons/cg';
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";

const LinkItems: Array<LinkItemProps> = [
  { name: "Label", icon: CgOrganisation, href: "/settings/labels" },
  { name: "Email Label", icon: CgOrganisation, href: "/settings/email-labels" },
  { name: "Phone Label", icon: CgOrganisation, href: "/settings/phone-labels" },
  { name: "Address Label", icon: CgOrganisation, href: "/settings/address-labels" },
  { name: "Website Label", icon: CgOrganisation, href: "/settings/website-labels" },
  { name: "Chat Label", icon: CgOrganisation, href: "/settings/chat-labels" },
  { name: "Reset Data", icon: CgOrganisation, href: "/settings/reset-data" },
];
const SettingsLayout = () => {
  return (
    <Flex width={"3xl"} mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Settings" menuItems={LinkItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box width={"100%"} flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default SettingsLayout