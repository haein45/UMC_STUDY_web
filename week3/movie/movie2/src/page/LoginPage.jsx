import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  padding: 70px 0px;
  background-color: #21234b;
`;

const Title = styled.div`
  color: white;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 32px;

  :last-child {
    margin-top: 30px;
  }
`;

const Input = styled.input`
  width: 50%;
  padding: 12px 20px;
  border-radius: 24px;
  margin: 10px 0;
  font-size: 14px;
`;

const Submit = styled(Input)`
  border: none;
  background-color: ${(props) => (props.enable ? "#fecd28" : "white")};
  cursor: ${(props) => (props.enable ? "pointer" : "not-allowed")};
`;

const Help = styled.div`
  margin-top: 20px;
  text-align: center;
  color: white;

  a {
    margin-left: 5px;
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
`;

const ErrorMessage = styled.div`
  width: 33%;
  text-align: left;
  color: red;
  font-size: 12px;
`;

const LoginPage = () => {
  const [enable, setEnable] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idMsg, setIdMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enable) return;

    setLoading(true);

    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in local storage
      navigate("/");
    } else {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "id":
        setId(value);
        setIdMsg(value ? "" : "아이디를 입력해주세요!");
        break;
      case "password":
        setPassword(value);
        setPasswordMsg(value ? "" : "비밀번호를 입력해주세요!");
        break;
      default:
        break;
    }

    setEnable(id && password);
  };

  return (
    <Container>
      <Title>로그인 페이지</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="id"
          type="text"
          placeholder="아이디를 입력해주세요"
          onChange={handleChange}
        />
        {idMsg && <ErrorMessage>{idMsg}</ErrorMessage>}
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handleChange}
        />
        {passwordMsg && <ErrorMessage>{passwordMsg}</ErrorMessage>}
        <Submit enable={enable} name="submit" type="submit" value="로그인" />
      </Form>
      <Help>
        아직 계정이 없으신가요?
        <Link to="/signup">회원가입 페이지로 이동하기</Link>
      </Help>
      {loading && <p>로그인 중...</p>}
    </Container>
  );
};

export default LoginPage;

