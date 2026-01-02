import React from "react"
import { Routes , Route} from "react-router"
import AuthPage from "./Pages/Auth/Auth"
import AddProperty from "./Pages/Forms/AddProperty"
function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/Form" element={<AddProperty/>} /> 
  </Routes>
  )
}

export default App
