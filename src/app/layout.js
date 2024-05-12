
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evault",
  description: "An Legal Records Management System",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
     
       <StoreProvider>
        {children}
 
        </StoreProvider>
         </body>
    </html>
  );
}
