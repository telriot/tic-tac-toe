import React from "react"
import headerStyles from "./Header.module.scss"

function Header() {
  return (
    <div>
      <h1 className={headerStyles.header}>
        <span>Tic </span>
        <span>Tac </span>
        <span>Toe</span>
      </h1>
    </div>
  )
}

export default Header
