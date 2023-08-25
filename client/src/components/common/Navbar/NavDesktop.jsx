import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/authAPI";
import { openModal } from "../../common/Modal/modalSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/avatar.png";
import bookmarkImg from "../../../assets/bookmark.jpg";
import { REGISTER, LOGIN, ADD_STORY } from "../../../constants";
import Button from "../Button/Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useSelector((state) => state.auth);

  const [menuClick, setMenuClick] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <h2 className={styles.logoText}>SwipTory</h2>
        <div className={styles.navBtns}>
          {!isAuthenticated ? (
            <>
              <Button
                text="Register Now"
                myFunction={() => dispatch(openModal(REGISTER))}
                size="small"
              ></Button>
              <Button
                text="Sign In"
                myFunction={() => dispatch(openModal(LOGIN))}
                size="small"
                color="#73abff"
              ></Button>
            </>
          ) : (
            <>
              <Button
                text="Bookmarks"
                myFunction={() => navigate("/bookmarks")}
                size="small"
              >
                <img src={bookmarkImg} width="14rem" />
              </Button>

              <Button
                text="Add story"
                myFunction={() => dispatch(openModal(ADD_STORY))}
                size="small"
              ></Button>
              <div>
                <img
                  src={avatar}
                  alt="avatar"
                  className={styles.profile}
                  width="40rem"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="hamburger" onClick={handleMenuClick}>
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13H19M1 7H19M1 1H19"
                    stroke="black"
                    strokeWidth="2" // Update stroke-width to strokeWidth
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
                {menuClick && (
                  <div className={styles.hamburger_content}>
                    <h4 style={{ marginBottom: "1rem" }}>{username}</h4>
                    <Button text="logout" myFunction={handleLogout} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
