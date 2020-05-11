import React, { createContext, useReducer } from "react"
import gridStyles from "./components/Grid.module.scss"

const INITIAL_POSITIONS = {
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
  9: undefined,
}
const STARTING_PLAYER = Math.ceil(Math.random() * 2)

const initialState = {
  activePlayer: STARTING_PLAYER,
  positions: INITIAL_POSITIONS,
  playerOneState: [],
  playerTwoState: [],
  winner: undefined,
  playerOneColor: undefined,
  playerTwoColor: undefined,
}
export const AppContext = createContext(initialState)

const AppContextProvider = (props) => {
  const TYPES = {
    EVALUATE_STATE: "EVALUATE_STATE",
    HANDLE_MOVE: "HANDLE_MOVE",
    RESET: "RESET",
    PICK_SIDE: "PICK_SIDE",
  }
  const logicReducer = (state, action) => {
    switch (action.type) {
      case TYPES.EVALUATE_STATE:
        return {
          ...state,
          winner: action.winner,
        }
      case TYPES.HANDLE_MOVE:
        return {
          ...state,
          positions: { ...state.positions, [action.move]: action.player },
          playerOneState: [
            ...state.playerOneState,
            action.player === 1 && action.move,
          ],
          playerTwoState: [
            ...state.playerTwoState,
            action.player === 2 && action.move,
          ],
          activePlayer: action.player === 1 ? 2 : 1,
        }
      case TYPES.RESET:
        return {
          ...initialState,
        }
      case TYPES.PICK_SIDE: {
        return {
          ...state,
          playerOneColor:
            action.color1 === "red" ? gridStyles.itemP2 : gridStyles.itemP1,
          playerTwoColor:
            action.color2 === "red" ? gridStyles.itemP2 : gridStyles.itemP1,
        }
      }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(logicReducer, initialState)

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
