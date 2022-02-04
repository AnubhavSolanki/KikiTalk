const { FaUser, FaEnvelope, FaLock } = require("react-icons/fa");

export const registerFields = [
  {
    name: "full_name",
    placeholder: "Full Name",
    validation: { required: true },
    icon: <FaUser />,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email Address",
    validation: { required: true, pattern: "/^[^s@]+@[^s@]+.[^s@]+$/" },
    icon: <FaEnvelope />,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: {
      required: true,
      pattern: "/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/",
    },
    icon: <FaLock />,
  },
];

export const loginFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Email Address",
    validation: { required: true, pattern: "/^[^s@]+@[^s@]+.[^s@]+$/" },
    icon: <FaEnvelope />,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: {
      required: true,
      pattern: "/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/",
    },
    icon: <FaLock />,
  },
];
