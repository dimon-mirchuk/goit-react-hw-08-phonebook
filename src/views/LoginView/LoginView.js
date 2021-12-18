import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

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
    <section>
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
          {errors.email && <span>{errors.email.message}</span>}
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
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <p>
          don`t have account? <Link to="/signup">sign up!</Link>
        </p>
        <button type="submit">
          {isLoading ? (
            <Loader type="ThreeDots" color="#69007e" height={20} width={35} />
          ) : (
            "ENTER"
          )}
        </button>
      </form>
    </section>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
};

export default LoginView;