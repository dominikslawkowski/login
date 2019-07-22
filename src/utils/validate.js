const emailRegexp = /\S+@\S+\.\S+/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function isFormValid({ email, password }) {
  const errors = {};

  if (!email || !emailRegexp.test(email)) {
    errors.email = "Invalid email";
  }

  if (!password || !passwordRegexp.test(password)) {
    errors.password = "Invalid password";
  }

  return errors;
}
