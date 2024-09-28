import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";

import "./api/axiosDefaults";

function App() {
  return (
      <div className={styles.App}>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </div>
  );
}

export default App;
