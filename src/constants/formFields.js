class FormField {
  constructor(name, placeholder, type, pattern, message, required) {
    this.name = name;
    this.placeholder = placeholder;
    this.type = type;
    this.pattern = pattern;
    this.message = message;
    this.required = required;
  }
}

const pattern = {
  name: /^[A-Za-z가-힣]+$/,
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  pwd: /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/,
  //최소8 자 및 최대 16자, 영문자 or 숫자 or 특수문자 2가지 이상 조합
};

const message = {
  name: "한글 또는 영문만 입력 가능합니다",
  email: "정확하지 않은 이메일입니다.",
  pwd: "비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 8자리 이상이여야 합니다.",
};

const required = {
  name: "이름은 필수입니다.",
  email: "이메일은 필수입니다.",
  pwd: "비밀번호는 필수입니다",
};

export const formFields = [
  new FormField("NAME", "이름", "text", pattern.name, message.name),
  new FormField("EMAIL", "이메일", "text", pattern.email, message.email),
  new FormField("PWD", "비밀번호", "password", pattern.pwd, message.pwd),
];
