import React, { useContext } from "react"
import appStyles from "./App.module.scss"
import Header from "./components/Header"
import Grid from "./components/Grid"
import Setup from "./components/Setup"
import { AppContext } from "./context"

function App() {
  const { state } = useContext(AppContext)
  return (
    <div className={appStyles.container}>
      <Header />
      {state.playerOneColor ? <Grid /> : <Setup />}
    </div>
  )
}

export default App
