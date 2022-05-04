import React from "react";
import FormInput from "../../utils/formInput";
import styles from "./sendEmail.module.css";
import { useForm } from "react-hook-form";
import { promiseToast } from "../../utils/toaster";
import { post } from "../../utils/requests";
import { useHistory } from "react-router-dom";

const SendEmail = ({ openOtpComponentSetter, emailSetter }) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const handleResetPassword = async (data) => {
    const { email } = data;
    emailSetter(email);
    const requestPasswordPromise = new Promise(async (resolve, reject) => {
      try {
        await post(`${process.env.REACT_APP_BASE_URL}/forgotPassword`, {
          email: email,
        });
        openOtpComponentSetter(true);
        resolve();
      } catch (err) {
        openOtpComponentSetter(false);
        reject(err);
      }
    });
    promiseToast(requestPasswordPromise, {
      pending: "Sending Email",
      success: "Email Sent Successfully",
    });
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Forgot Password?</h2>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <FormInput
          field={{
            name: "email",
            placeholder: "Enter Email",
            type: "email",
            validation: {
              required: true,
              pattern: "/^[^s@]+@[^s@]+.[^s@]+$/",
            },
          }}
          register={register}
        />
        <button className={styles.submitButton}>Reset Password</button>
        <button
          onClick={() => {
            history.push("login");
          }}
          className={styles.backButton}
        >
          Back
        </button>
      </form>
    </>
  );
};

export default SendEmail;
