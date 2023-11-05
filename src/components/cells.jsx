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
  const [noughtsArr, setNoughtsArr] = useState([]);
  const [crossesArr, setCrossesArr] = useState([]);
  const [modalFlag, setModalFlag] = useState(false); // флаг для показа модального окна после окончаня игры
  const [winner, setWinner] = useState("");

  const handleClick = (el) => {
    //  первый "if" запрещает менять символ текущей клетки
    if (!crossesArr.includes(el) && !noughtsArr.includes(el)) {
      if ((crossesArr.length + noughtsArr.length) % 2 === 0) {
        setNoughtsArr((prev) => [...prev, el].sort());
      } else {
        setCrossesArr((prev) => [...prev, el].sort());
      }
    }
  };

  useEffect(() => {
    if (scanPlayersArray(cellsForWin, crossesArr)) {
      setWinner("КРЕСТИКИ"); // crosses
      modalWindow();
    }

    if (scanPlayersArray(cellsForWin, noughtsArr)) {
      setWinner("НОЛИКИ"); //noughts
      modalWindow();
    }
  }, [crossesArr, noughtsArr]);

  const restart = () => {
    setNoughtsArr([]);
    setCrossesArr([]);
    setModalFlag((prev) => (prev ? !prev : prev));
  };

  const modalWindow = () => {
    setModalFlag((prev) => !prev);
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
              crossesArr.includes(index + 1) || noughtsArr.includes(index + 1)
                ? style.visit
                : style.unvisit
            }
          >
            {/* текст в "h3": если на текущую клетку нажимали, то выводит символ игрока, который нажал, а иначе, если на клетку не нажимали, то при наведении будет подсвечиваться символ игрока, который сейчас ходит (зависит от длины массивов обоих игроков, так как они ходят поочередно), а, */}
            {crossesArr.includes(index + 1)
              ? "X"
              : noughtsArr.includes(index + 1)
              ? "O"
              : (crossesArr.length + noughtsArr.length) % 2 === 0
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
