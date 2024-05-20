import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddUser from './components/AddUser'
import AllUsers from './components/AllUsers'
import LayoutPage from './components/LayoutPage'
import NoPage from './components/NoPage'

function App() {

  return(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<LayoutPage />}>
      <Route index element={<AllUsers />} />
      <Route path="adduser" element={<AddUser />} />
      <Route path="*" element={<NoPage />} />
    </Route>
  </Routes>
  </BrowserRouter>)
}

export default App
