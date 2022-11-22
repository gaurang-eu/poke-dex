import React from 'react'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import App from './App'
import Header from './component/Header'
import Favourite from './Favourite'
import NavBar from './NavBar'

import { useQuery } from '@apollo/client/react/hooks'
import { PokemanResult } from './types/PokemonResult'
import { getMorePokemon } from './graphql/queries'
import Loader from './component/Loader'
import AlertMessage from './component/AlertMessage'

import { useDispatch } from 'react-redux'
// import { RootState } from './pokedex-redux/store'
import { putPokemonList } from './pokedex-redux/PokemonReducer'
import { NO_INTERNET_MSG } from './util/constants'

function Main () {
  const { loading, error, data } = useQuery<PokemanResult>(getMorePokemon(-1))
  // const queryPokemons = useSelector((state: RootState) => state.pokemons.queryPokemons)
  const dispatch = useDispatch()

  let PlaceholderLayout = null

  if (loading) {
    PlaceholderLayout = <Loader />
  } else if (error != null) {
    PlaceholderLayout = <AlertMessage message={`${NO_INTERNET_MSG} Error: ${error.message}.`} />
  } else if ((data != null) && data.allPokemon) {
    dispatch(putPokemonList(data.allPokemon))
    // PlaceholderLayout =
  }

  return (
    <Container fluid className='m-1'>
      <Header />
      <NavBar/>
      {PlaceholderLayout}
      <Routes>
      <Route path='/' element={<App loading={loading}/>} />
      <Route path='/favourite' element={<Favourite />} />
    </Routes>
    </Container>
  )
}
export default Main
