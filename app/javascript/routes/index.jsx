import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Movies from "../components/Movies"
import Login from "../components/Login"
import Signup from "../components/Signup"
import Tickets from "../components/Movies/Tickets"

export default (
  <Routes>
    <Route path="/" element={<Movies />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/tickets" element={<Tickets />} />
  </Routes>
);
