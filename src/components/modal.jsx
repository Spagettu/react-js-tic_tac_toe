/* eslint-disable react/prop-types */
import React from "react";
import style from "./style.module.css";
import PropTypes from "prop-types";
import store from "../utils/store";

export const Modal = ({ restart }) => {
  let winner = store.getState().winner;

  return (
    <div className={style.modal}>
      <div>
        {winner + " победили!"}
        <button onClick={restart}>Играть заново</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  restart: PropTypes.func.isRequired,
  winner: PropTypes.string,
};
