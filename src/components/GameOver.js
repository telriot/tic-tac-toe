import React, { useContext } from "react"
import { AppContext } from "../context"
import gameOverStyles from "./GameOver.module.scss"
function GameOver() {
  const { dispatch, state } = useContext(AppContext)
  const { winner } = state
  const handleClick = () => {
    dispatch({ type: "RESET" })
  }

  return (
    <div className={gameOverStyles.container}>
      <p className={gameOverStyles.text}>
        {winner && winner === 1
          ? "YOU WIN"
          : winner === 2
          ? "YOU LOSE"
          : "IT'S A DRAW"}
      </p>
      <button className={gameOverStyles.button} onClick={handleClick}>
        Play again
      </button>
    </div>
  )
}

export default GameOver
