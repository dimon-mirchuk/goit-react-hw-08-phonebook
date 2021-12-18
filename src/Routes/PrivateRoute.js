import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectCurrentIsLoggedIn } from "../Redux/auth/authSelectors";

export default function PrivateRoute({
  children,
  redirectTo = "/",
  ...routeProps
}) {
  const isLoggedIn = useSelector(selectCurrentIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
