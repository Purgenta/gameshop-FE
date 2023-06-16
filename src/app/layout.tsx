"use client";
import ContextProvider from "@/redux/ContextProvider/ContextProvider";
import "./globals.css";
import { Box } from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Notifications from "@/components/Notifications/Notifications";
import Provider from "./Provider";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "@/components/Layout/Layout";
import Wrapper from "./Wrapper";
import { SWRConfig } from "swr";
export const metadata = {
  title: "Gameshop",
  description: "An e-commerce solution for selling video games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Provider>
            <Wrapper>
              <ChakraProvider>
                <SWRConfig value={{ errorRetryInterval: 1000 }}>
                  <SidebarWithHeader>
                    <Notifications />
                    {children}
                  </SidebarWithHeader>
                  <Box position={"relative"} ml={{ base: 0, md: 60 }} p="4">
                    <Footer></Footer>
                  </Box>
                </SWRConfig>
              </ChakraProvider>
            </Wrapper>
          </Provider>
        </ContextProvider>
      </body>
    </html>
  );
}
