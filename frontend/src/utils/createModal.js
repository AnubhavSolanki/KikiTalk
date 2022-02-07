import React from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { Component } from "react";
import { FaTimes } from "react-icons/fa";

const createModal = (component) => {
  ReactDOM.render(
    <Modal component={component} />,
    document.querySelector("#modal")
  );
};

const removeModal = () => {
  ReactDOM.render(<></>, document.querySelector("#modal"));
};

class Modal extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <FaTimes onClick={removeModal} style={{ color: "white" }} size={30} />
        </div>
        <div className={styles.modal_container}>{this.props.component}</div>
      </div>
    );
  }
}

export default createModal;
