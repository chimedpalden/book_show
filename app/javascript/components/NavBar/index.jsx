import React from "react";
import NavItem from "./NavItem";
import { getFromLocalStorage, setToLocalStorage } from "../utils/storage";
import { either, isEmpty, isNil } from "ramda";
import { resetAuthTokens } from "../apis/axios";
import authApi from "../apis/auth";

const NavBar = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  console.log("asd", isLoggedIn)

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      // logger.error(error);
    }
  };

  const LogOut = () => {
    // console.log(authToken)
    if (authToken) {
      return(
        <a
          onClick={handleLogout}
          className="inline-flex items-center px-1 pt-1 text-sm
          font-semibold leading-5 text-bb-gray-600 text-opacity-50
          transition duration-150 ease-in-out border-b-2
          border-transparent hover:text-bb-gray-600 focus:outline-none
          focus:text-bb-gray-700 cursor-pointer"
        >
          LogOut
        </a>
      )
    }
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <div class="logo-container">
        <div class="logo-holder logo-1">
          <a href="">
            <h3>BookMyShow</h3>
            <p>Watch your faviorite movies</p>
          </a>
        </div>
      </div>

        <hr className="pt-3"></hr>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <NavItem iconClass="fs-4 bi-speedometer2" name="Dashboard" path="/" />
          {!isLoggedIn && <NavItem name="Login" path="login" />}
          {isLoggedIn && <LogOut />}
          {isLoggedIn && <NavItem name="Bookings" path="tickets" />}
          {!isLoggedIn && <NavItem name="Signup" path="signup" />}

        </ul>

      </div>
    </>
  );
};
  
export default NavBar;
