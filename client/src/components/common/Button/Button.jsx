import React from "react";
import styles from "./Button.module.css";
import { useDispatch, useSelector } from "react-redux";

const Button = ({ myFunction, color, text, children, size }) => {
  const { isSmallScreen } = useSelector((state) => state.layout);

  return (
    <button
      className={`${styles.button} ${
        size === "small" ? styles.small_btn : ""
      } ${isSmallScreen ? styles.small_btn_mob : ""}`}
      style={{ backgroundColor: color ? color : "#FF7373" }}
      onClick={() => {
        myFunction();
      }}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
