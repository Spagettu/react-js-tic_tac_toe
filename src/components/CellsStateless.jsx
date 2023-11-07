/* eslint-disable react/prop-types */
import style from "./style.module.css";
import PropTypes from "prop-types";

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

export const CellsStateless = ({
  handleClick,
  crossesArray,
  noughtsArray,
  restart,
}) => {
  return (
    <>
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
            {/* текст в "h3": если на текущую клетку нажимали, то выводит символ игрока, который нажал, а иначе, если на клетку не нажимали, то при наведении будет подсвечиваться символ игрока, который сейчас ходит (зависит от длины массивов обоих игроков, так как они ходят поочередно) */}
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

CellsStateless.propTypes = {
  restart: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  noughtsArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  crossesArray: PropTypes.arrayOf(PropTypes.number).isRequired,
};
