import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/auth/authSlice";
import { selectCurrentUser } from "../../Redux/auth/authSelectors";
import { PageHeader, Menu, Button } from "antd";
import { useState } from "react";

const Navigation = ({ isLoggedIn }) => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("Sign in");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <PageHeader
      ghost={false}
      title="Phonebook"
      extra={[
        <div key="1">
          {isLoggedIn ? (
            <div>
              <h3>{user?.name}</h3>
              <Button
                htmlType="button"
                type="primary"
                onClick={() => dispatch(logOut())}
              >
                Log out
              </Button>
            </div>
          ) : (
            <nav>
              <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
              >
                <Menu.Item key="Sign in">
                  <Link to="/login">Sign in</Link>
                </Menu.Item>
                <Menu.Item key="Sign up">
                  <Link to="/signup">Sign up</Link>
                </Menu.Item>
              </Menu>
            </nav>
          )}
        </div>,
      ]}
    ></PageHeader>
  );
};

export default Navigation;
