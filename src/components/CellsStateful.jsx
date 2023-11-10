/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { scanPlayersArray } from "./helpers/helper";
import { CellsStateless } from "./CellsStateless";

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
  const [noughtsArray, setNoughtsArray] = useState([]);
  const [crossesArray, setCrossesArray] = useState([]);
  const [winner, setWinner] = useState("");

  const handleClick = (el) => {
    //  первый "if" запрещает менять символ текущей клетки
    if (!crossesArray.includes(el) && !noughtsArray.includes(el)) {
      if ((crossesArray.length + noughtsArray.length) % 2 === 0) {
        setNoughtsArray((prev) => [...prev, el]);
      } else {
        setCrossesArray((prev) => [...prev, el]);
      }
    }
  };

  useEffect(() => {
    if (scanPlayersArray(cellsForWin, noughtsArray)) {
      setWinner("НОЛИКИ"); //noughts
    }
  }, [noughtsArray]);

  useEffect(() => {
    if (scanPlayersArray(cellsForWin, crossesArray)) {
      setWinner("КРЕСТИКИ"); // crosses
    }
  }, [crossesArray]);

  const restart = () => {
    setNoughtsArray([]);
    setCrossesArray([]);
    setWinner("");
  };

  return (
    <>
      {winner && <Modal reset={restart}>{winner} победили!</Modal>}
      <CellsStateless
        noughtsArray={noughtsArray}
        crossesArray={crossesArray}
        restart={restart}
        handleClick={handleClick}
      />
    </>
  );
};
