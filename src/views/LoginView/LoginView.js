import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { Row, Col, Button } from "antd";

const LoginView = ({ onSubmit, error, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (!error) return;
    toast.error(
      `${
        error.status === 400
          ? "Wrong email or password"
          : "Something went wrong. Please try again later"
      }`
    );
    reset();
  }, [error, reset]);

  return (
    <Row align="middle" justify="center">
      <Col>
        <section style={{ marginTop: "50px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                {...register("email", {
                  required: { value: true, message: "Please enter your email" },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors.email && <div>{errors.email.message}</div>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please, enter your password",
                  },
                  maxLength: {
                    value: 30,
                    message: "Your password can`t be longer than 30",
                  },
                  minLength: {
                    value: 7,
                    message: "Your password can`t be shorter than 7",
                  },
                })}
              />
              {errors.password && <div>{errors.password.message}</div>}
            </div>
            <p>
              Don`t have account? <Link to="/signup">sign up!</Link>
            </p>
            <Button htmlType="submit" type="primary">
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#69007e"
                  height={20}
                  width={35}
                />
              ) : (
                "ENTER"
              )}
            </Button>
          </form>
        </section>
      </Col>
    </Row>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
};

export default LoginView;
