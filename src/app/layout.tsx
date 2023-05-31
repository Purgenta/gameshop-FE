"use client";
import ContextProvider from "@/redux/ContextProvider/ContextProvider";
import "./globals.css";
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
                </SWRConfig>
              </ChakraProvider>
              <Footer />
            </Wrapper>
          </Provider>
        </ContextProvider>
      </body>
    </html>
  );
}
