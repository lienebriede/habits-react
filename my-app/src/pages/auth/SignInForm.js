import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { SetCurrentUserContext } from "../../App";

function SignInForm() {
  const setCurrentUser = useContext(SetCurrentUserContext);

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting sign-in data:", signInData);
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      console.log("Login response data:", data);
      // Set the Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Token ${data.key}`;
      console.log("Authorization header set:", axios.defaults.headers.common['Authorization']);
      
      const userResponse = await axios.get("/dj-rest-auth/user/");
      console.log("User data retrieved:", userResponse.data);
      setCurrentUser(data.user); 
      navigate("/");
    } catch (err) {
      console.log("Error during sign-in:", err);
      setErrors(err.response?.data);
    }
  }

  return (
    <Container className={appStyles}>
        <div>
          <h1 className={styles.Header}>Sign In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={handleChange}
                autoComplete="off"
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handleChange}
                autoComplete="off"
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button className={btnStyles.Button} type="submit">
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </div>

        <div>
          <p>Don't have an account?{" "}
            <Link className={styles.Link} to="/signup">
            Sign up!
          </Link></p>
        </div>
      
    </Container>
  );
};

export default SignInForm;