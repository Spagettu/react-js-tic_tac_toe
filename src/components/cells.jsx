/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Modal } from "./modal";
import { scanPlayersArray } from "./helpers/helper";

const classArray = [
  //массив дополнительных классов для клеток
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

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

export const Cells = () => {
  const [noughtsArray, setNoughtsArray] = useState([]);
  const [crossesArray, setCrossesArray] = useState([]);
  const [modalFlag, setModalFlag] = useState(false); // флаг для показа модального окна после окончаня игры
  const [winner, setWinner] = useState("");

  const handleClick = (el) => {
    //  первый "if" запрещает менять символ текущей клетки
    if (!crossesArray.includes(el) && !noughtsArray.includes(el)) {
      if ((crossesArray.length + noughtsArray.length) % 2 === 0) {
        setNoughtsArray((prev) => [...prev, el].sort());
      } else {
        setCrossesArray((prev) => [...prev, el].sort());
      }
    }
  };

  useEffect(() => {
    if (scanPlayersArray(cellsForWin, crossesArray)) {
      setWinner("КРЕСТИКИ"); // crosses
      setModalFlag((prev) => !prev);
    }

    if (scanPlayersArray(cellsForWin, noughtsArray)) {
      setWinner("НОЛИКИ"); //noughts
      setModalFlag((prev) => !prev);
    }
  }, [crossesArray, noughtsArray]);

  const restart = () => {
    setNoughtsArray([]);
    setCrossesArray([]);
    setModalFlag((prev) => (prev ? !prev : prev));
  };

  return (
    <>
      {modalFlag && <Modal text={winner + " победили!"} reset={restart} />}
      {classArray.map((el, index) => (
        <div
          className={style.cell + " " + style[el]}
          key={index}
          onClick={() => handleClick(index + 1)}
        >
          <h3
            className={
              crossesArray.includes(index + 1) ||
              noughtsArray.includes(index + 1)
                ? style.visit
                : style.unvisit
            }
          >
            {/* текст в "h3": если на текущую клетку нажимали, то выводит символ игрока, который нажал, а иначе, если на клетку не нажимали, то при наведении будет подсвечиваться символ игрока, который сейчас ходит (зависит от длины массивов обоих игроков, так как они ходят поочередно), а, */}
            {crossesArray.includes(index + 1)
              ? "X"
              : noughtsArray.includes(index + 1)
              ? "O"
              : (crossesArray.length + noughtsArray.length) % 2 === 0
              ? "O"
              : "X"}
          </h3>
        </div>
      ))}
      <button style={{ marginTop: "20px" }} onClick={() => restart()}>
        Играть заново
      </button>
    </>
  );
};
