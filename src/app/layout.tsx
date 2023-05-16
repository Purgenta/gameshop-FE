import ContextProvider from "@/redux/ContextProvider/ContextProvider";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Notifications from "@/components/Notifications/Notifications";
import Nav from "@/components/Nav/Nav";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

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
      <ContextProvider>
        <body className={inter.className}>
          {
            <>
              <header id="main-header">
                <Nav />
              </header>

              <Notifications />
              {children}
              <Footer />
            </>
          }
        </body>
      </ContextProvider>
    </html>
  );
}
