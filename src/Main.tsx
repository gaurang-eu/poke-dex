import React from 'react'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import Header from './component/Header'
import Favourite from './Favourite'
import NavBar from './NavBar'

const Main = () => {
  return (
    <Container>
      <Header />
      <NavBar/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/favourite' element={<Favourite/>} />
      </Routes>
    </Container>
  )
}
export default Main
