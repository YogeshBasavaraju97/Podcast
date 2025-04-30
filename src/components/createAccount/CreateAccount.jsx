
'use client';
import React, { useState } from "react";
import "./CreateAccount.css";
import axios from "axios";
import toast from "react-hot-toast";
import { validateSignup } from "@/helper/validateSigup";

export default function CreateAccount() {


  const [UserName, setUserName] = useState("Yog");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");



  const handleSubmit = async () => {
    setError("");
    const errorMessage = validateSignup({ UserName, emailId, password, confirmPassword });
    if (errorMessage) {
      toast.error(errorMessage);
      setError(errorMessage);
      return;
    }

    console.log(UserName, emailId, password, confirmPassword);


    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {

      const res = await axios.post('/api/signup', {
        UserName,
        emailId,
        password,

      }, { withCredentials: true });
      toast.success("Signup successful!");
      console.log(res);


    } catch (error) {
      console.error(error);
      const message = error?.response?.data.error || "something went wrong";
      toast.error(error?.response?.data?.error || 'Something went wrong.');
      setError(message);
    }
  };

  return (
    <div className="container">
      <h2 className="color">Sign Up</h2>
      <div className="form">
        <label> UserName</label>
        <input
          type="text"
          name="UserName"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="emailId"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}

        <button type="button" onClick={handleSubmit}>Create Account</button>
      </div>
    </div>
  );
};


