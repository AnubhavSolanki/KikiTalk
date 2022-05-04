import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../utils/formInput";
import { promiseToast } from "../../utils/toaster";
import styles from "./newPassword.module.css";
import { post } from "../../utils/requests";
import { useHistory } from "react-router-dom";

const NewPassword = ({ token, email }) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const handleNewPassword = ({ password }) => {
    const requestPasswordPromise = new Promise(async (resolve, reject) => {
      try {
        await post(`${process.env.REACT_APP_BASE_URL}/saveNewPassword`, {
          token,
          password,
          email,
        });
        history.push("/login");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
    promiseToast(requestPasswordPromise, {
      pending: "Saving New Password",
      success: "Password Saved Successfully",
    });
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Create New Password</h2>
      <form onSubmit={handleSubmit(handleNewPassword)}>
        <FormInput
          field={{
            name: "password",
            placeholder: "New Password",
            type: "password",
            validation: {
              required: true,
              pattern:
                "/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/",
            },
          }}
          register={register}
        />
        <button className={styles.submitButton}>Submit</button>
      </form>
    </>
  );
};

export default NewPassword;
