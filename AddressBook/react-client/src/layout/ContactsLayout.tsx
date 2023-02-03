import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiUsers, FiHome, FiTrendingUp } from "react-icons/fi";
import { MdLabelOutline } from "react-icons/md";
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";
import { LabelApi } from "../api/labelApi";
import { LabelReqSearch, LabelRes } from "../dtos/Label";

const ContactsLayout = () => {
  const [navItems, setNavItems] = useState<Array<LinkItemProps>>([]);

  useEffect(() => {
    loadLabels();
  }, []);

  const loadLabels = () => {
    LabelApi.search(new LabelReqSearch({}, {})).then((res) => {
      let labels: LabelRes[] = res.pagedList;
      let categoryNavItems: Array<LinkItemProps> = [{
        name: "All Contacts",
        href: "",
        icon: MdLabelOutline,
      }];
      labels.map((value) => {
        categoryNavItems.push({
          name: value.name || "",
          href: "?labelId=" + value.labelId,
          icon: MdLabelOutline,
        });
      });
      // console.log(res.pagedList);
      setNavItems(categoryNavItems);
    });
  };

  return (
    <Flex width={"4xl"} mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Contacts" menuItems={navItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box width={"100%"} flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default ContactsLayout;
