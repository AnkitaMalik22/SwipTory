import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not_found_container">
      <img
        className="not_found_img"
        src="https://i.imgur.com/qIufhof.png"
        alt="not found"
      />
      <h1 className="not_found_heading">Oops! Look like you are lost.</h1>

      <Button
        text="Go Home"
        myFunction={() => navigate("/")}
        color="#ffa143"
      ></Button>
    </div>
  );
};

export default NotFound;
