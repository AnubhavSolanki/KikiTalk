import React from "react";
import styles from "./formInput.module.css";

const FormInput = ({ field, register = () => {} }) => {
  return (
    <div className={styles.inputBox}>
      {field?.icon ?? null}
      <input
        type={field?.type ?? null}
        className={`${styles.input} ${
          field?.icon ? "" : styles.fixInputPlaceholder
        }`}
        placeholder={field?.placeholder ?? null}
        {...register(field?.name ?? null, field?.validation ?? null)}
      />
    </div>
  );
};

export default FormInput;
