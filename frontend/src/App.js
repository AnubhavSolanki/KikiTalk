import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import Home from "./components/home/home";
import Login from "./components/authentication/login";
import Navbar from "./components/navbar/navbar";
import Register from "./components/authentication/register";
import { useEffect, useState } from "react";
import { saveUserDetails } from "./features/userSlice";
import { post } from "./utils/requests";

require("dotenv").config();

export const verifyToken = (token, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await post(
        `${process.env.REACT_APP_BASE_URL}/auth/loginWithToken`,
        { token: token }
      );
      if (response.status === 200) {
        dispatch(saveUserDetails(response?.data));
        resolve(true);
      }
    } catch (err) {
      reject(false);
    }
  });
};

function App() {
  const [loginState, setLoginState] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoginState(await verifyToken(token, dispatch));
      } else {
        setLoginState(false);
      }
    };
    window.addEventListener("storage", checkUserData);
    window.dispatchEvent(new Event("storage"));
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {loginState ? (
            <>
              <Navbar />
              <Route path="/home">
                <Home />
              </Route>
              <Redirect to="/home" />
            </>
          ) : (
            <>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Redirect to="/login" />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
