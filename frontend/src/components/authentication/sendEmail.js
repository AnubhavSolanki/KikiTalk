import React from "react";
import FormInput from "../../utils/formInput";
import styles from "./sendEmail.module.css";
import { useForm } from "react-hook-form";
import { promiseToast } from "../../utils/toaster";
import { post } from "../../utils/requests";

const SendEmail = ({ openOtpComponentSetter, emailSetter }) => {
  const { register, handleSubmit } = useForm();
  const handleResetPassword = async (data) => {
    const { email } = data;
    emailSetter(email);
    openOtpComponentSetter(true);
    const requestPasswordPromise = new Promise(async (resolve, reject) => {
      try {
        await post(`${process.env.REACT_APP_BASE_URL}/forgotPassword`, {
          email: email,
        });
        resolve();
      } catch (err) {
        openOtpComponentSetter(false);
        reject(err);
      }
    });
    promiseToast(requestPasswordPromise, {
      pending: "Sending Email",
      success: "Email Sent Successfully",
      error: "Error Occured",
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
      </form>
    </>
  );
};

export default SendEmail;
