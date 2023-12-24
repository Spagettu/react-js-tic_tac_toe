import { createStore, combineReducers } from "redux";

const initialCrossesArray = [];
const initialNoughtsArray = [];
const initialWinner = "";

function crossesReducer(state = initialCrossesArray, action) {
  {
    switch (action.type) {
      case "Add_To_Crosses_Array":
        return [...state, action.payload];
      case "Clear_Crosses":
        return initialCrossesArray;
      default:
        return state;
    }
  }
}

function noughtsReducer(state = initialNoughtsArray, action) {
  {
    switch (action.type) {
      case "Add_To_Noughts_Array":
        return [...state, action.payload];
      case "Clear_Noughts":
        return initialCrossesArray;
      default:
        return state;
    }
  }
}

function winnerReducer(state = initialWinner, action) {
  {
    switch (action.type) {
      case "Add_Winner":
        return action.payload;
      case "Clear_Winner":
        return initialWinner;
      default:
        return state;
    }
  }
}

const rootReducer = combineReducers({
  crosses: crossesReducer,
  noughts: noughtsReducer,
  winner: winnerReducer,
});

const store = createStore(rootReducer);

export default store;
