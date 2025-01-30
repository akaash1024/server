import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { Notes } from './components/Dashboard'
import './App.css'
import { CreateNote } from './components/CreateNote'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element = {<Signup/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/createnote" element = {<CreateNote/>}/>
        <Route path="/notes" element = {<Notes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
