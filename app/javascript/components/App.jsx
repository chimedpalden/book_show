import React, { useEffect, useState } from "react";
import Routes from "../routes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import NavBar from "./NavBar";
import { getFromLocalStorage } from "./utils/storage";
import { either, isEmpty, isNil } from "ramda";

const App =  props => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  useEffect(() => {
    // console.log(isLoggedIn);
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <NavBar/>
        </div>
        <div class="col py-3">
        {Routes}
        </div>
      </div>
    </div>
  </>
  )
};
export default App;