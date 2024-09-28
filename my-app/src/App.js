import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import SignIn from "./pages/auth/SignInForm";
import SignUp from "./pages/auth/SignUpForm";

function App() {
  return (
      <div className={styles.App}>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
  );
}

export default App;
