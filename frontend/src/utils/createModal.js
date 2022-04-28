import React from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { Component } from "react";
import { FaTimes } from "react-icons/fa";
import { Provider } from "react-redux";
import store from "../store";

const CreateModal = (component, onRemoveModal = null) => {
  ReactDOM.render(
    <Provider store={store}>
      <Modal component={component} removeModalFunction={onRemoveModal} />
    </Provider>,
    document.querySelector("#modal")
  );
};

export const removeModal = (removeModalFunction) => {
  if (removeModalFunction) removeModalFunction();
  ReactDOM.render(<></>, document.querySelector("#modal"));
};

class Modal extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <FaTimes
            onClick={() => {
              removeModal(this.props.removeModalFunction);
            }}
            style={{ color: "white" }}
            size={30}
          />
        </div>
        <div className={styles.modal_container}>{this.props.component}</div>
      </div>
    );
  }
}

export default CreateModal;
