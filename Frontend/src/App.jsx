import React from "react"
import { Routes , Route} from "react-router"
import AuthPage from "./Pages/Auth/Auth"
import AddProperty from "./Pages/Forms/AddProperty"
import AdminViewPage from "./Pages/Admin/AdminViewPage"
import AdminPropertyPage from "./Pages/Admin/AdminPropertyPage"
function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/Form" element={<AddProperty />} /> 
      <Route path="/AdminViewPage" element={<AdminViewPage/>} /> 
      <Route path="/AdminProperty/:id" element={<AdminPropertyPage/>} /> 
  </Routes>
  )
}

export default App 
