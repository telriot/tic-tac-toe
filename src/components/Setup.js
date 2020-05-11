import React, { useContext } from "react"
import { AppContext } from "../context"
import setupStyles from "./Setup.module.scss"

function Setup() {
  const { dispatch } = useContext(AppContext)

  const handleClick = (e) => {
    e.persist()
    const color1 = e.target.dataset.color
    dispatch({
      type: "PICK_SIDE",
      color1,
      color2: color1 === "red" ? "blue" : "red",
    })
  }

  return (
    <div className={setupStyles.container}>
      <h3 className={setupStyles.header}>Pick a color</h3>
      <div className={setupStyles.buttons}>
        <div className={setupStyles.red} data-color="red" onClick={handleClick}>
          RED
        </div>
        <div
          className={setupStyles.blue}
          data-color="blue"
          onClick={handleClick}
        >
          BLUE
        </div>
      </div>
    </div>
  )
}

export default Setup
