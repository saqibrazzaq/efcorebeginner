import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FiUsers, FiHome, FiTrendingUp } from "react-icons/fi";
import {CgOrganisation} from 'react-icons/cg';
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";

const LinkItems: Array<LinkItemProps> = [
  { name: "Label", icon: CgOrganisation, href: "/settings/labels" },
  { name: "Email Label", icon: CgOrganisation, href: "/settings/email-labels" },
  { name: "Phone Label", icon: CgOrganisation, href: "/settings/phone-labels" },
  { name: "Address Label", icon: CgOrganisation, href: "/settings/address-labels" },
  { name: "Website Label", icon: CgOrganisation, href: "/settings/website-labels" },
  { name: "Chat Label", icon: CgOrganisation, href: "/settings/chat-labels" },
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