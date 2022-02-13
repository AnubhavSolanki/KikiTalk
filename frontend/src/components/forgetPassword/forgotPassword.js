import React from "react";
import styles from "./forgotPassword.module.css";
import { useState } from "react";
import OtpVerification from "./otpVerification";
import NewPassword from "./newPassword";
import SendEmail from "./sendEmail";

const ForgotPassword = () => {
  const [openOtpComponent, setOpenOtpComponent] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState();
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isVerified ? (
          <NewPassword email={email} token={token} />
        ) : openOtpComponent ? (
          <OtpVerification
            email={email}
            isVerifiedSetter={setIsVerified}
            openOtpComponentSetter={setOpenOtpComponent}
            tokenSetter={setToken}
          />
        ) : (
          <SendEmail
            emailSetter={setEmail}
            openOtpComponentSetter={setOpenOtpComponent}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
