import React from "react";
import qs from "qs";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import { registerFields } from "./formFields";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../../features/userSlice";
import { addDataToLocalStorage } from "../../utils/manageLocalStorage";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        qs.stringify(data)
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Registered");
        dispatch(saveUserDetails(response?.data));
        addDataToLocalStorage({ token: response?.data?.token });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.heading}>Register</h1>
        {registerFields.map((field, index) => {
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
        <button className={styles.submitButton}>Register</button>
        <p>
          Already a member ? <Link to="/login">Go to Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
