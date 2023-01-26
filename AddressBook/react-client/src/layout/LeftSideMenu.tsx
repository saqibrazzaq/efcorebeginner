import {
  Box,
  Container,
  Flex,
  FlexProps,
  Heading,
  Icon,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { Link as RouteLink } from "react-router-dom";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

interface SideMenuProps {
  menuItems: Array<LinkItemProps>;
  menuHeading: string;
}

const LeftSideMenu: React.FC<SideMenuProps> = ({menuItems, menuHeading}: SideMenuProps) =>  {
  return (
    <Box minH="50vh" >
      <Stack spacing={0} as={Container} maxW={"3xl"} textAlign={"left"}>
        <Heading fontSize={"xl"}>{menuHeading}</Heading>
        {menuItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href}>
            {link.name}
          </NavItem>
        ))}
      </Stack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      as={RouteLink}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default LeftSideMenu;
