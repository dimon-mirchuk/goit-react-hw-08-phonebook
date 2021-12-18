import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/auth/authSlice";
import { selectCurrentUser } from "../../Redux/auth/authSelectors";

const Navigation = ({ isLoggedIn }) => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <NavLink activeClassName="currentNavLink" to="/">
            Home
          </NavLink>
          <h3>{user?.name}</h3>
          <button type="button" onClick={() => dispatch(logOut())}>
            Log out
          </button>
        </div>
      ) : (
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="currentNavLink" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="currentNavLink" to="/login">
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="currentNavLink" to="/signup">
                Sign up
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
