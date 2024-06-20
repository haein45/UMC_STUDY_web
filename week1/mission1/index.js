const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const password = document.getElementById("password");
const passwordcheck = document.getElementById("passwordcheck");
const nameValidation = document.getElementById("nameValidation");
const emailValidation = document.getElementById("emailValidation");
const ageValidation = document.getElementById("ageValidation");
const passwordValidation = document.getElementById("passwordValidation");
const passwordcheckValidation = document.getElementById("passwordcheckValidation");
const signup = document.getElementById("signup");
const modalWrapper = document.getElementById("modal-wrapper");
const close = document.getElementById("close");

function validateName() {
  if (name.value) {
    nameValidation.style.color = "green";
    nameValidation.innerText = "멋진 이름이네요!";
    return true;
  } else {
    nameValidation.style.color = "red";
    nameValidation.innerText = "필수 입력 항목입니다!";
  }
  return false;
}

function validateEmail() {
  if (email.value.includes("@")) {
    emailValidation.style.color = "green";
    emailValidation.innerText = "올바른 이메일 형식입니다!";
    return true;
  } else {
    emailValidation.style.color = "red";
    emailValidation.innerText = "올바른 이메일 형식이 아닙니다!";
  }
  return false;
}

function validateAge() {
  if (age.value % 1 !== 0) {
    ageValidation.style.color = "red";
    ageValidation.innerText = "나이는 소수가 될 수 없습니다!";
  } else if (age.value < 0) {
    ageValidation.style.color = "red";
    ageValidation.innerText = "나이는 음수가 될 수 없습니다!";
  } else if (age.value < 19) {
    ageValidation.style.color = "red";
    ageValidation.innerText = "미성년자는 가입할 수 없습니다!";
  } else {
    ageValidation.style.color = "green";
    ageValidation.innerText = "올바른 나이 형식입니다!";
    return true;
  }
  return false;
}

function validatePassword() {
  const pwCheck = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#%^&*])$/;

  if (!pwCheck.test(password.value)) {
    passwordValidation.style.color = "red";
    passwordValidation.innerText = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
  } else if (password.value.length < 4) {
    passwordValidation.style.color = "red";
    passwordValidation.innerText = "비밀번호는 최소 4자리 이상이어야 합니다.";
  } else if (password.value.length > 12) {
    passwordValidation.style.color = "red";
    passwordValidation.innerText = "비밀번호는 최대 12자리까지 가능합니다.";
  } else {
    passwordValidation.style.color = "green";
    passwordValidation.innerText = "올바른 비밀번호입니다!";
    return true;
  }
  return false;
}

function validateCheckPassword() {
  if (password.value && password.value === passwordcheck.value) {
    passwordcheckValidation.style.color = "green";
    passwordcheckValidation.innerText = "비밀번호가 일치합니다.";
    return true;
  } else {
    passwordcheckValidation.style.color = "red";
    passwordcheckValidation.innerText = "비밀번호가 일치하지 않습니다.";
  }
  return false;
}

signup.onclick = (event) => {
  event.preventDefault(); 
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isAgeValid = validateAge();
  const isPasswordValid = validatePassword();
  const isPasswordCheckValid = validateCheckPassword();

  if (isNameValid && isEmailValid && isAgeValid && isPasswordValid && isPasswordCheckValid) {
    modalWrapper.style.display = "flex";
  }
};

close.onclick = () => {
  modalWrapper.style.display = "none";
};
