"use client";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "@/redux/cartSlice/cartSlice";
import style from "./Layout.module.css";
import Image from "next/image";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiShoppingCart,
  FiChevronDown,
  FiDatabase,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import useCartItemCount from "@/requests/cart/hooks/useCartItemCount";
import { setCount } from "@/redux/cartSlice/cartSlice";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { useRouter } from "next/navigation";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Footer from "../Footer/Footer";
interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Search", icon: FiTrendingUp, href: "/search" },
  { name: "Profile", icon: FiCompass, href: "/profile" },
];
const AdminRoutes: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiDatabase, href: "/admin/dashboard/1" },
];
export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box position={"relative"} ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const session = useSession();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src={"https://www.g2a.com/static/assets/images/logo_g2a_white.svg"}
          width={75}
          height={75}
          alt="logo"
        ></Image>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      {session.data?.user.role === "ROLE_ADMIN" &&
        AdminRoutes.map((link) => (
          <NavItem href={link.href} key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
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

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { isLoaded, itemCount } = useSelector(cartSelector);
  const { data } = useSession();
  const isAuth = data?.user.accessToken ? true : false;
  const getCount = useCartItemCount();
  useEffect(() => {
    if (!isAuth) {
      dispatch(setCount(0));
      return;
    } else if (isLoaded) return;
    const fetchCount = async () => {
      try {
        const response = await getCount();
        dispatch(setCount(response.count));
      } catch (error: any) {
        dispatch(
          addNotification({
            message: "Failed to obtain cart items",
            notificationType: "ERROR",
          })
        );
      }
    };
    fetchCount();
  }, [dispatch, getCount, isAuth, isLoaded]);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box display={{ base: "flex", md: "none" }}>
        <Image
          src={"https://www.g2a.com/static/assets/images/logo_g2a_white.svg"}
          width={75}
          height={75}
          alt="logo"
        ></Image>
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Button
          className={style["shoping-cart__btn"]}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          position={"relative"}
          onClick={() => navigate.push("/cart")}
        >
          <FiShoppingCart />
          <span className={style["item-count"]}>{itemCount}</span>
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{data?.user.email || ""}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {data?.user.role.split("ROLE_")[1] || ""}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => navigate.push("/profile")}>
                Profile
              </MenuItem>
              <MenuDivider />
              {isAuth ? (
                <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
              ) : (
                <MenuItem onClick={() => navigate.push("/login")}>
                  Login
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
