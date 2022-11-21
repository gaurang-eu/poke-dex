import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {
  return <Navbar bg="info" variant="light" className="mb-4 ps-2">
    <Navbar.Brand>PokeDex</Navbar.Brand>
    <div className='nav-link-div'>
      <Link to="/">Home</Link>
      <Link to="/favourite">Favourite</Link>
    </div>
</Navbar>
}

export default NavBar
