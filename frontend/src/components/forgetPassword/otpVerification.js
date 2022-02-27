import React from "react";
import FormInput from "../../utils/formInput";
import { useForm } from "react-hook-form";
import styles from "./otpVerification.module.css";
import { post } from "../../utils/requests";
import { promiseToast } from "../../utils/toaster";

const OtpVerification = ({
  email,
  isVerifiedSetter,
  openOtpComponentSetter,
  tokenSetter,
}) => {
  const { register, handleSubmit } = useForm();
  const handleVerifyOtp = ({ otp }) => {
    const requestPasswordPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await post(
          `${process.env.REACT_APP_BASE_URL}/verifyOtp`,
          {
            email: email,
            otp: otp,
          }
        );
        if (response.status === 200) {
          isVerifiedSetter(true);
          tokenSetter(response.data.token);
          resolve();
        }
        reject();
      } catch (err) {
        reject(err);
      }
    });
    promiseToast(requestPasswordPromise, {
      pending: "Verifying OTP",
      success: "OTP Verified Successfully",
      error: "Error Occured",
    });
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Enter Verification Code</h2>
      <form onSubmit={handleSubmit(handleVerifyOtp)}>
        <FormInput
          field={{
            name: "otp",
            placeholder: "OTP",
            validation: {
              required: true,
            },
          }}
          register={register}
        />
        <button className={styles.submitButton}>Verify</button>
        <button
          onClick={() => {
            openOtpComponentSetter(false);
          }}
          className={styles.backButton}
        >
          Back
        </button>
      </form>
    </>
  );
};

export default OtpVerification;
