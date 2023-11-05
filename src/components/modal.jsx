/* eslint-disable react/prop-types */
import React from "react";
import style from "./style.module.css";

export const Modal = ({ text = "wdwdd", reset }) => {
  return (
    <div className={style.modal}>
      <div>
        {text}
        <button onClick={() => reset()}>Играть заново</button>
      </div>
    </div>
  );
};
