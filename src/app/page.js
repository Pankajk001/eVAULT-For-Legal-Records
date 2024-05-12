'use client'
import React, { useEffect } from "react";
import HomeMain from "@/components/Home/HomeMain";
import Navbar from "@/components/other/Navbar";
import Footer from "@/components/other/Footer";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/store";
import { setUser } from "@/redux/actions";
export default function Home() {
  const dispatch = useDispatch(); 
  useEffect(() => {
  const userId = localStorage.getItem("userId");
   const userData={
    userId:userId
   }
    dispatch(setUser(userData));
  },[dispatch])
  return (
  <>
  <Provider store={store}>
  <Navbar/>
  <HomeMain/>
  <Footer/>
  </Provider>
  </>
  );
}
