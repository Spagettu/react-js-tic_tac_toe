/* eslint-disable react/prop-types */
import React from "react";
import style from "./style.module.css";
import PropTypes from "prop-types";

export const Modal = ({ reset, children }) => {
  return (
    <div className={style.modal}>
      <div>
        {children}
        <button onClick={() => reset()}>Играть заново</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  reset: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
