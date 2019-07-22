export default function isFormValid({ email, password }) {
  let errors = {};
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email";
  }
  if (!password || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
    errors.password = "Invalid password";
  }
  return errors;
}
