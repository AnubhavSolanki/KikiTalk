import React from "react";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { loginFields } from "./formFields";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../../features/userSlice";
import { addDataToLocalStorage } from "../../utils/manageLocalStorage";
import { post } from "../../utils/requests";
import { successToast } from "../../utils/toaster";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const response = await post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      data
    );
    if (response.status === 200) {
      successToast("Login Successfully");
      dispatch(saveUserDetails(response?.data));
      addDataToLocalStorage({ token: response?.data?.token });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.heading}>Login</h1>
        {loginFields.map((field, index) => {
          return (
            <div key={index} className={styles.inputBox}>
              {field.icon ?? null}
              <input
                type={field.type ?? null}
                className={styles.input}
                placeholder={field.placeholder ?? null}
                {...register(field.name ?? null, field.validation ?? null)}
              />
            </div>
          );
        })}
        <button className={styles.submitButton}>Login</button>
        <p>
          Not a member ? <Link to="/register">Go to Register</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
