import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link as RouteLink } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

interface NavItem {
  name: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const TopNavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [navItems, setNavItems] = useState<Array<NavItem>>([]);

  useEffect(() => {
    setTopMenu();
  }, []);

  const setTopMenu = () => {
    const menuItems: Array<NavItem> = [
      {
        name: "Countries",
        href: "/countries",
      },
      {
        name: "States",
        href: "/states",
      },
      {
        name: "Cities",
        href: "/cities",
      },
      {
        name: "Settings",
        href: "/settings",
      },
    ];
    setNavItems(menuItems);
  };

  const colorSwitcherMenu = () => (
    <>
      <ColorModeSwitcher justifySelf="flex-end" />
    </>
  );

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <RouteLink to="/">
              {/* <Image src="/saleone-logo.png" height={"30px"} /> */}
              Home
            </RouteLink>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav NAV_ITEMS={navItems} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {colorSwitcherMenu()}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={navItems} />
      </Collapse>
    </Box>
  );
};

interface NavItemProps {
  NAV_ITEMS: Array<NavItem>;
}

const DesktopNav: React.FC<NavItemProps> = (props) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} align="center" spacing={4}>
      {props.NAV_ITEMS.map((navItem) => (
        <Box key={navItem.name}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                as={RouteLink}
                to={navItem.href ?? "/category/" + navItem.href}
                // href={navItem.href ?? "#"}
                fontSize={"md"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.name}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.name} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ name, href, subLabel }: NavItem) => {
  return (
    <Link
      as={RouteLink}
      to={href ? "category/" + href : "#"}
      // href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {name}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          {/* <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} /> */}
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav: React.FC<NavItemProps> = (props) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {props.NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.name} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ name, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouteLink}
        to={href ? "category/" + href : "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {name}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.name}
                py={2}
                as={RouteLink}
                to={child.href ? "category/" + child.href : "#"}
              >
                {child.name}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default TopNavBar;
