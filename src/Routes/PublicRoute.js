import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectCurrentIsLoggedIn } from "../Redux/auth/authSelectors";

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
  ...routeProps
}) {
  const isLoggedIn = useSelector(selectCurrentIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
