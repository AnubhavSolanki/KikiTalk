import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "./App.css";
import { Redirect } from "react-router";
import Home from "./components/home/home";
import Login from "./components/authentication/login";
import Navbar from "./components/navbar/navbar";
import Register from "./components/authentication/register";
import { useEffect, useState } from "react";

require("dotenv").config();

export const verifyToken = (token) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      token: token,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/loginWithToken`,
        qs.stringify(data)
      );
      if (response.status === 200) {
        resolve(true);
      }
    } catch (err) {
      console.log(err.response.data);
      reject(false);
    }
  });
};

function App() {
  const [loginState, setLoginState] = useState(false);
  useEffect(() => {
    const checkUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoginState(await verifyToken(token));
      } else {
        setLoginState(false);
      }
    };
    window.addEventListener("storage", checkUserData);
    window.dispatchEvent(new Event("storage"));
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, []);

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
