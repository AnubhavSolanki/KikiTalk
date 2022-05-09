import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/home/home";
import Login from "./components/authentication/login";
import Navbar from "./components/navbar/navbar";
import Register from "./components/authentication/register";
import { useEffect, useState } from "react";
import { saveUserDetails, selectUser } from "./features/userSlice";
import { post } from "./utils/requests";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/forgetPassword/forgotPassword";
import Profile from "./components/profile/profile";
import Notifications from "./components/notifications/notifications";
import GuardedRoute from "./utils/guardedRoute";
import Message from "./components/message/message";
import Loading from "./components/loading/loading";
import { setLoading, unsetLoading } from "./features/loadingSlice";
import { createSocket, resetSocket } from "./features/socketSlice";
import { useWindowUrlChange } from "./utils/useWindowUrlChange";
import { useSessionStorage } from "./utils/sessionStorage";
import { navTabs } from "./components/navbar/navTabs";
import { setActive } from "./features/navSlice";

require("dotenv").config();

export const verifyToken = (token, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await post(
        `${process.env.REACT_APP_BASE_URL}/auth/loginWithToken`
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
const nonAuthRoutes = ["login", "register", "forgotPassword"];

function App() {
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);
  const [loginState, setLoginState] = useState(true);
  const dispatch = useDispatch();
  const { windowUrl } = useWindowUrlChange();
  const { addData, removeData, getLastUrl, sessionData } = useSessionStorage();
  const history = useHistory();
  const userData = useSelector(selectUser);

  useEffect(() => {
    const checkUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setLoading());
        dispatch(createSocket({ token }));
        setLoginState(await verifyToken(token, dispatch));
        // dispatch(setLoading({ loading: false }));
      } else {
        setLoginState(false);
        dispatch(setLoading({ loading: false }));
      }
    };
    window.addEventListener("storage", checkUserData);
    window.dispatchEvent(new Event("storage"));
    return () => {
      window.removeEventListener("storage", checkUserData);
      dispatch(resetSocket());
      dispatch(setLoading({ loading: false }));
    };
  }, []);

  useEffect(() => {
    if (firstTimeLoad && getLastUrl()) {
      let link = getLastUrl();
      link = link.substring(link.lastIndexOf("/") + 1);
      if (link) history.push(link);
      for (const [index, tab] of navTabs.entries()) {
        console.log(`${tab?.path} matches with ${link}`);
        if (tab?.path && tab.path.includes(link)) {
          console.log(`${link} matched`);
          dispatch(setActive({ index }));
          break;
        }
      }
    }
    if (!firstTimeLoad && windowUrl) {
      addData(["LatestWindowUrl", windowUrl]);
    }
    return () => {
      if (
        nonAuthRoutes.every(
          (route) => !String(window.location.href).includes(route)
        )
      )
        setFirstTimeLoad(false);
    };
  }, [addData, windowUrl]);

  return (
    <div className="App">
      <Loading />
      <ToastContainer />
      <Switch>
        {loginState ? (
          <>
            <Navbar />
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/message">
              <Message />
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
            <Route path="/forgotPassword">
              <ForgotPassword />
            </Route>
            <Redirect to="/login" />
          </>
        )}
      </Switch>
      {/* <Switch>
          <GuardedRoute
            path="/home"
            component={Home}
            exact={true}
            auth={loginState}
          />
          <Route path="/login" component={Login} exact={true} />
        </Switch> */}
    </div>
  );
}

export default App;
