import React, { useState, useEffect, useRef, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './pokedex-redux/store'
import { putPokemonList, searchPokemonStateList } from './pokedex-redux/PokemonReducer'

import { useQuery } from '@apollo/client/react/hooks'

import './App.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import PokemonCard from './component/PokemonCard'

import Header from './component/Header'

import { PokemanResult } from './types/PokemonResult'
import { getMorePokemon } from './graphql/queries'
import LoadMore from './component/LoadMore'
import Loader from './component/Loader'
import AlertMessage from './component/AlertMessage'
import { INITIAL_OFFSET, LIST_LIMIT } from './util/constants'
import Search from './component/Search'
import PokemonFilter from './component/PokemonFilter'

function App () {
  const allPokemonsLoaded = useSelector((state: RootState) => state.pokemons.allPokemonsLoaded)
  const queryPokemons = useSelector((state: RootState) => state.pokemons.queryPokemons)
  const dispatch = useDispatch()

  const [offset, setOffset] = useState<number>(INITIAL_OFFSET)
  const [searchWord, setSearchWord] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')
  const { loading, error, data } = useQuery<PokemanResult>(getMorePokemon(-1))
  const [moreLoadingPressed, setMoreLoadingPressed] = useState<boolean>(false)

  useEffect(() => {
    dispatch(searchPokemonStateList({ offset, limit: LIST_LIMIT, searchWord, filterType }))
  }, [allPokemonsLoaded, offset])

  const loadMorePokemon = useCallback(() => {
    console.log('loadMorePokemon called')
    setMoreLoadingPressed(true)
    setOffset(offset + LIST_LIMIT)
  }, [offset])

  const searchPokemon = useCallback(() => {
    console.log('searchPokemon with searchWord ' + searchWord)
    setMoreLoadingPressed(false)
    dispatch(searchPokemonStateList({ offset: 0, limit: 12, searchWord, filterType }))
    setOffset(0)
  }, [searchWord, filterType])

  const filterPokemonByType = useCallback((selectPokemonType: string) => {
    console.log('filterPokemonByType filterType= ' + selectPokemonType)
    setMoreLoadingPressed(false)
    dispatch(searchPokemonStateList({ offset: 0, limit: 12, searchWord, filterType: selectPokemonType }))
    setFilterType(selectPokemonType)
    setOffset(0)
  }, [searchWord, filterType])

  // The reference will be used to detect list end
  const intersecObserver = useRef<IntersectionObserver | null>(null)

  const lastPokemonRef = useCallback((pokemonEle: any) => {
    if (loading) { return }
    if (intersecObserver.current != null) { intersecObserver.current.disconnect() }

    intersecObserver.current = new IntersectionObserver(pokemons => {
      if (pokemons[0].isIntersecting) {
        console.log('We are possibaly at the last Pokemon')
        if (moreLoadingPressed) { loadMorePokemon() }
      }
    })

    if (pokemonEle) { intersecObserver.current.observe(pokemonEle) }
  }, [loading, loadMorePokemon])

  let MainLayout = null
  let MoreLoadingLayout = null

  if (!moreLoadingPressed && loading) {
    MainLayout = <Loader />
  } else if (error != null) {
    MainLayout = <AlertMessage message={error.message} />
  } else if ((data != null) && data.allPokemon) {
    dispatch(putPokemonList(data.allPokemon))
  }

  if (queryPokemons && queryPokemons.length > 0 && queryPokemons[0].id !== '0') {
    MainLayout = <Row>
    {queryPokemons.map((pokemon, index) => {
      if (queryPokemons.length === index + 1) {
        return (
          <PokemonCard key={pokemon.id} ref={lastPokemonRef} front_default={pokemon.sprites.front_default} back_default={pokemon.sprites.back_default} name={pokemon.name} id={pokemon.id} types={pokemon.types} />
        )
      }
      return (
        <PokemonCard key={pokemon.id} front_default={pokemon.sprites.front_default} back_default={pokemon.sprites.back_default} name={pokemon.name} id={pokemon.id} types={pokemon.types} />
      )
    })}</Row>
  }

  if (!moreLoadingPressed && !loading) {
    MoreLoadingLayout = <LoadMore loadMorePokemon={loadMorePokemon} showLoadMoreButton={true} />
  } else if (moreLoadingPressed && loading) {
    MoreLoadingLayout = <LoadMore loadMorePokemon={loadMorePokemon} showLoadMoreButton={false} />
  }

  return (
    <Container>
      <Header />
      <Row className="justify-content-center p-1 bg-info">
        <Search searchPokemon={searchPokemon} setSearchWord={(value: string) => { console.log(value); setSearchWord(value) } }/>
        <PokemonFilter filterPokemonByType={filterPokemonByType} />
      </Row>
      {MainLayout}
      {queryPokemons && queryPokemons.length > 11 && MoreLoadingLayout}
    </Container>
  )
}

export default App
