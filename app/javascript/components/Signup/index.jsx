import React, { useState } from "react";
import SignupForm from "./Form";
import authApi from "../apis/auth";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async event => {
    event.preventDefault();
    console.log(password)
    console.log(passwordConfirmation)
    setLoading(true);
    try {
      authApi.signup({
        username: name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
      setLoading(false);
    }
  };
  return (
    <SignupForm
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
