import React from "react";
import { useSelector } from "react-redux";
import styles from "./Modal.module.css";

const Modal = ({ children }) => {
  const { modal } = useSelector((state) => state.modal);

  return (
    <>
      <div
        className={styles.modal}
        style={{
          background: modal ? "linear-gradient(#00000099, #00000099)" : "#ffff",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
