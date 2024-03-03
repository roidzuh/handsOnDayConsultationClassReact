import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    border: 1px solid #999;
    opacity: 0.5;

    &:hover {
      background-color: #ccc;
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    setLoading(true);

    axios
      .post("https://api.mudoapi.tech/login", payload)
      .then((res) => {
        const token = res?.data?.data?.token;
        localStorage.setItem("access_token", token);
        if (token) {
          setLoading(false);
          setNotif("login berhasil");
          setTimeout(() => {
            navigate("/menu");
          }, 1000);
        }
      })
      .catch((err) => {
        // console.log(err.response);
        setLoading(false);
        setNotif(err?.response?.data?.message);
      });
  };

  return (
    <Layout>
      <Container>
        <FormContainer>
          <Title>Login</Title>
          {!!notif.length && <p>{notif}</p>}
          <Form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUsernameChange}
            />

            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button type="submit" disabled={loading ? true : false}>
              {loading ? "loading..." : "Login"}
            </Button>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </Form>
        </FormContainer>
      </Container>
    </Layout>
  );
};

export default Login;
