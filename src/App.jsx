import React from "react";
import { useState } from 'react'
import Routes from "./Routes";
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Routes />
    </>
  )
}

export default App
