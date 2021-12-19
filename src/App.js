import { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navigation from "./components/Navigation";
import {
  useLoginMutation,
  useRefreshUserQuery,
  useSignupMutation,
} from "./Redux/contactsAPI";
import { setCredentials, reloginUser } from "./Redux/auth/authSlice";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import {
  selectCurrentIsLoggedIn,
  selectCurrentToken,
} from "./Redux/auth/authSelectors";

const ContactsView = lazy(() => import("./views/ContactsView"));
const RegistrationView = lazy(() => import("./views/RegistrationView"));
const LoginView = lazy(() => import("./views/LoginView"));

function App() {
  const dispatch = useDispatch();
  const [add, { error: signupError, isLoading: signupLoading }] =
    useSignupMutation();
  const [login, { error: loginError, isLoading: loginLoading }] =
    useLoginMutation();
  const isLoggedIn = useSelector(selectCurrentIsLoggedIn);
  const isToken = useSelector(selectCurrentToken);
  const { data: refreshUserData, isFetching } = useRefreshUserQuery();
  // console.log(error);
  useEffect(() => {
    if (!refreshUserData || !isToken) return;

    dispatch(reloginUser(refreshUserData));
  }, [dispatch, isToken, refreshUserData]);

  const handleRegistration = (credentials) =>
    add(credentials).then(({ data }) => {
      if (!data) return;
      dispatch(setCredentials(data));
    });

  const handleLogIn = (credentials) =>
    login(credentials).then(({ data }) => {
      if (!data) return;
      dispatch(setCredentials(data));
    });
  return (
    <>
      <Router>
        {!isFetching && (
          <>
            <Navigation isLoggedIn={isLoggedIn} />
            <Switch>
              <Suspense
                fallback={
                  <Loader
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    type="BallTriangle"
                    color="#69007e"
                    height={100}
                    width={100}
                  />
                }
              >
                <PublicRoute path="/login" restricted redirectTo="/contacts">
                  <LoginView
                    onSubmit={handleLogIn}
                    error={loginError}
                    isLoading={loginLoading}
                  />
                </PublicRoute>
                <PublicRoute path="/signup" restricted redirectTo="/contacts">
                  <RegistrationView
                    onSubmit={handleRegistration}
                    error={signupError}
                    isLoading={signupLoading}
                  />
                </PublicRoute>
                <PrivateRoute patch="/contacts">
                  <ContactsView />
                </PrivateRoute>

                <Redirect to={isLoggedIn ? "/contacts" : "/login"} />
              </Suspense>
            </Switch>
          </>
        )}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
