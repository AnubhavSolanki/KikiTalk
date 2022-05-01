import React from "react";
import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import { registerFields } from "./formFields";
import { Link } from "react-router-dom";
import { addDataToLocalStorage } from "../../utils/manageLocalStorage";
import { post } from "../../utils/requests";
import { successToast } from "../../utils/toaster";
import FormInput from "../../utils/formInput";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await post(
      `${process.env.REACT_APP_BASE_URL}/auth/register`,
      data
    );
    if (response.status === 200) {
      successToast("Registered Successfully");
      addDataToLocalStorage({ token: response?.data?.token });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.heading}>Register</h1>
        {registerFields.map((field, index) => (
          <FormInput key={index} field={field} register={register} />
        ))}
        <button className={styles.submitButton}>Register</button>
        <p>
          Already a member ? <Link to="/login">Go to Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
