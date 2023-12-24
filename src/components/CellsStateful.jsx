/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { scanPlayersArray } from "../utils/helper";
import { CellsStateless } from "./CellsStateless";
import store from "../utils/store";

const cellsForWin = [
  // номера победных клеток
  "1,2,3",
  "4,5,6",
  "7,8,9",
  "1,4,7",
  "2,5,8",
  "3,6,9",
  "1,5,9",
  "3,5,7",
];

export const CellsStateful = () => {
  const [noughtsArray, setNoughtsArray] = useState(store.getState().noughts);
  const [crossesArray, setCrossesArray] = useState(store.getState().crosses);
  const [winner, setWinner] = useState(store.getState().winner);

  const handleClick = (el) => {
    //  первый "if" запрещает менять символ текущей клетки
    if (!crossesArray.includes(el) && !noughtsArray.includes(el)) {
      if ((crossesArray.length + noughtsArray.length) % 2 === 0) {
        store.dispatch({ type: "Add_To_Noughts_Array", payload: el });
        setNoughtsArray(store.getState().noughts);
      } else {
        store.dispatch({ type: "Add_To_Crosses_Array", payload: el });
        setCrossesArray(store.getState().crosses);
      }
    }
  };

  useEffect(() => {
    if (scanPlayersArray(cellsForWin, noughtsArray)) {
      store.dispatch({ type: "Add_Winner", payload: "НОЛИКИ" });
      setWinner(store.getState().winner); //noughts
    }
    if (scanPlayersArray(cellsForWin, crossesArray)) {
      store.dispatch({ type: "Add_Winner", payload: "КРЕСТИКИ" });
      setWinner(store.getState().winner); // crosses
    }
  }, [noughtsArray, crossesArray]);

  const restart = () => {
    store.dispatch({ type: "Clear_Crosses" });
    store.dispatch({ type: "Clear_Noughts" });
    store.dispatch({ type: "Clear_Winner" });
    setNoughtsArray(store.getState().noughts);
    setCrossesArray(store.getState().crosses);
    setWinner(store.getState().winner);
  };

  return (
    <>
      {winner && <Modal restart={restart} />}
      <CellsStateless
        noughtsArray={noughtsArray}
        crossesArray={crossesArray}
        restart={restart}
        handleClick={handleClick}
      />
    </>
  );
};
