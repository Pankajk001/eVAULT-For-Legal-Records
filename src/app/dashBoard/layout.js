'use client'
import DefaultLayout from "@/components/other/DefaultLayout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/redux/actions";
export default function RootLayout({ children }) {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();  
  useEffect(() => {
  const userId = localStorage.getItem("userId");
   const userData={
    userId:userId
   }
    dispatch(setUser(userData));
  },[dispatch,user.userId])
  return (
    <html lang="en">
      <body >
      <DefaultLayout>
       {
        user.userId ? children:<div  className=" justify-center items-center flex text-3xl font-semibold h-screen">Login to access the dashboard</div>
       }
    
  
        </DefaultLayout>
        
         </body>
    </html>
  );
}
