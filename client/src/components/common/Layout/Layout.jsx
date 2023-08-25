import React, { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { setScreenSize } from "./LayoutSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const checkScreenSize = () => {
    const screenWidth = window.innerWidth;

    dispatch(
      setScreenSize({
        isSmallScreen: screenWidth < 768,
        isLargeScreen: screenWidth >= 768,
      })
    );
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return <>{children}</>;
};

export default Layout;
