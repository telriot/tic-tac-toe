import React, { useContext, useEffect } from "react"
import gridStyles from "./Grid.module.scss"
import GameOver from "./GameOver"
import { AppContext } from "../context"
import {
  decideMove,
  evaluateState,
  getPossibleMoves,
  winningPositions,
} from "../GameLogic"

function Grid() {
  const { state, dispatch } = useContext(AppContext)
  const {
    positions,
    activePlayer,
    winner,
    playerOneState,
    playerTwoState,
    playerOneColor,
    playerTwoColor,
  } = state

  useEffect(() => {
    const end = evaluateState(positions, winningPositions)
    if (end) {
      dispatch({ type: "EVALUATE_STATE", winner: end })
    } else {
      const move = decideMove({
        positions,
        activePlayer,
        wincon: winningPositions,
        playerOneState,
        playerTwoState,
      })
      activePlayer === 2
        ? dispatch({ type: "HANDLE_MOVE", move, player: activePlayer })
        : console.log("waiting...")
    }
  }, [activePlayer])

  const handleItemClick = (e) => {
    e.persist()
    const possibleMoves = getPossibleMoves(positions)
    const move = parseInt(e.target.dataset.name)
    if (!winner && possibleMoves.includes(move)) {
      dispatch({ type: "HANDLE_MOVE", move, player: activePlayer })
    }
  }

  const renderItems = () => {
    let display = []
    for (let i = 1; i <= 9; i++) {
      display.push(
        <div
          key={`item-${i}`}
          data-name={i}
          value={positions[i]}
          className={
            positions[i] === 1
              ? playerOneColor
              : positions[i] === 2
              ? playerTwoColor
              : gridStyles.itemP0
          }
          onClick={handleItemClick}
        ></div>
      )
    }
    return display
  }

  return (
    <div className={gridStyles.container}>
      <div className={gridStyles.grid}>{renderItems()}</div>
      {state.winner ? <GameOver /> : null}
    </div>
  )
}

export default Grid
