import React, { useEffect, useState } from "react";
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

const Help = styled.div`
  margin-top: 50px;
  text-align: center;
  color: white;

  a {
    margin-left: 5%;
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

const SignupPage = () => {
  const [enable, setEnable] = useState(false);
  const [valid, setValid] = useState(Array(6).fill(false));
  const [data, setData] = useState({});
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [ageMsg, setAgeMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordCheckMsg, setPasswordCheckMsg] = useState("");
  const [idMsg, setIdMsg] = useState("");

  const navigate = useNavigate();

  const Submit = styled(Input)`
    border: none;
    background-color: ${enable ? "#fecd28" : "white"};
    cursor: ${enable ? "pointer" : "not-allowed"};
  `;

  useEffect(() => {
    if (!valid.includes(false)) {
      setEnable(true);
    } else {
      setEnable(false); // Added to handle case when any validation fails again
    }
  }, [valid]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    var validState = [...valid];

    switch (e.target.name) {
      case "name":
        if (e.target.value.length > 0) {
          validState[0] = true;
          setValid(validState);
          setNameMsg("");
        } else {
          setNameMsg("이름을 입력해주세요!");
          validState[0] = false;
          setValid(validState);
        }
        break;

      case "id":
        if (e.target.value.length > 0) {
          validState[5] = true;
          setValid(validState);
          setIdMsg("");
        } else {
          setIdMsg("아이디를 입력해주세요!");
          validState[5] = false;
          setValid(validState);
        }
        break;

      case "email":
        if (e.target.value.length > 0) {
          if (
            e.target.value.match(
              /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            )
          ) {
            validState[1] = true;
            setValid(validState);
            setEmailMsg("");
          } else {
            setEmailMsg("이메일 형식에 맞게 다시 입력해주세요!");
            validState[1] = false;
            setValid(validState);
          }
        } else {
          setEmailMsg("이메일을 입력해주세요!");
          validState[1] = false;
          setValid(validState);
        }
        break;

      case "age":
        if (e.target.value.length > 0) {
          if (e.target.value < 0) {
            setAgeMsg("나이는 양수여야 합니다.");
            validState[2] = false;
            setValid(validState);
          } else if (e.target.value % 1 !== 0) {
            setAgeMsg("나이는 실수로 입력할 수 없습니다.");
            validState[2] = false;
            setValid(validState);
          } else if (e.target.value < 19) {
            setAgeMsg("19세 이용만 사용 가능합니다!");
            validState[2] = false;
            setValid(validState);
          } else {
            validState[2] = true;
            setValid(validState);
            setAgeMsg("");
          }
        } else {
          setAgeMsg("나이는 숫자로 입력해주세요!");
          validState[2] = false;
          setValid(validState);
        }
        break;

      case "password":
        if (e.target.value.length < 4) {
          setPasswordMsg("비밀번호는 최소 4자리 이상이어야 합니다.");
          validState[3] = false;
          setValid(validState);
        } else if (e.target.value.length > 13) {
          setPasswordMsg("비밀번호는 최대 12자리까지 가능합니다.");
          validState[3] = false;
          setValid(validState);
        } else if (
          !e.target.value.match(
            "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{4,12}$"
          )
        ) {
          setPasswordMsg(
            "영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다."
          );
          validState[3] = false;
          setValid(validState);
        } else {
          validState[3] = true;
          setValid(validState);
          setPasswordMsg("");
        }
        break;

      case "checkPassword":
        if (e.target.value.length < 1) {
          setPasswordCheckMsg("비밀번호를 다시 입력해주세요!");
          validState[4] = false;
          setValid(validState);
        } else if (e.target.value !== data.password) {
          setPasswordCheckMsg("비밀번호가 일치하지 않습니다.");
          validState[4] = false;
          setValid(validState);
        } else {
          validState[4] = true;
          setValid(validState);
          setPasswordCheckMsg("");
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enable) return;

    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("회원가입이 정상적으로 처리되었습니다!");
      navigate("/login");
    } else {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Container>
        <Title>회원가입 페이지</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
          />
          {!valid[0] && <ErrorMessage>{nameMsg}</ErrorMessage>}
          <Input
            name="id"
            type="text"
            placeholder="아이디를 입력해주세요"
            onChange={handleChange}
          />
          {!valid[5] && <ErrorMessage>{idMsg}</ErrorMessage>}
          <Input
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={handleChange}
          />
          {!valid[1] && <ErrorMessage>{emailMsg}</ErrorMessage>}
          <Input
            name="age"
            type="number"
            placeholder="나이를 입력해주세요"
            onChange={handleChange}
          />
          {!valid[2] && <ErrorMessage>{ageMsg}</ErrorMessage>}
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChange}
          />
          {!valid[3] && <ErrorMessage>{passwordMsg}</ErrorMessage>}
          <Input
            name="checkPassword"
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleChange}
          />
          {!valid[4] && <ErrorMessage>{passwordCheckMsg}</ErrorMessage>}
          <Submit name="submit" type="submit" value="제출하기" />
        </Form>
        <Help>
          이미 아이디가 있으신가요?
          <Link to="/login">로그인 페이지로 이동하기</Link>
        </Help>
      </Container>
    </>
  );
};

export default SignupPage;
