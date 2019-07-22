import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import loginRequest from "utils/api";

const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const removeToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  console.log("cos");
};

const initialState = {
  loading: true,
  token: ""
};

const initialContext = {
  ...initialState,
  login: () => {},
  logout: () => {}
};

const AuthContext = React.createContext(initialContext);

class AuthProvider extends Component {
  state = initialState;

  async componentDidMount() {
    const token = getToken();

    if (token) {
      console.log("Found Token");
      this.setState({ loading: false, token });
    } else {
      console.log("Token not found");
      this.props.history.replace("/");
      this.setState({ loading: false });
    }
  }

  login = async ({ email, password, keepLoggedIn }) => {
    const token = await this.authorize({ email, password }, keepLoggedIn);
    console.log(token);
    this.setState({ token });
    return token;
  };

  logout = () => {
    removeToken();
    this.setState({ token: "" });
  };

  authorize = async (values, keepLoggedIn) => {
    console.log(keepLoggedIn);
    try {
      let loginToken = await loginRequest(values.email, values.password);

      console.log("Good Token");
      const storage = keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem("token", loginToken);

      return loginToken;
    } catch (ex) {
      console.error(ex);
      removeToken();
      return "";
    }
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Provider = withRouter(AuthProvider);
export default AuthContext;
