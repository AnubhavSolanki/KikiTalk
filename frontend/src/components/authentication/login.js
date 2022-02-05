import React from "react";
import qs from "qs";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./login.module.css";
import { loginFields } from "./formFields";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        qs.stringify(data)
      );
      if (response.status === 200) {
        console.log("Login Successfully");
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err) {
      console.log(err.response.data);
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
