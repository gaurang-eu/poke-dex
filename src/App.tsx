import React, { useState, useEffect, useRef, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './pokedex-redux/store'
import { searchPokemonStateList } from './pokedex-redux/PokemonReducer'

// import { useQuery } from '@apollo/client/react/hooks'

import './App.css'
import Row from 'react-bootstrap/Row'
import PokemonCardWrapper from './component/PokeCardWrapper'

// import { PokemanResult } from './types/PokemonResult'
// import { getMorePokemon } from './graphql/queries'
import LoadMore from './component/LoadMore'
// import Loader from './component/Loader'
// import AlertMessage from './component/AlertMessage'
import { INITIAL_OFFSET, LIST_LIMIT } from './util/constants'
import Search from './component/Search'
import PokemonFilter from './component/PokemonFilter'

// function App (props: { loading: boolean }) {
function App (props: { loading: boolean }) {
  const allPokemonsLoaded = useSelector((state: RootState) => state.pokemons.allPokemonsLoaded)
  const queryPokemons = useSelector((state: RootState) => state.pokemons.queryPokemons)
  const dispatch = useDispatch()

  const [offset, setOffset] = useState<number>(INITIAL_OFFSET)
  const [searchWord, setSearchWord] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')
  // const { props.loading, error, data } = useQuery<PokemanResult>(getMorePokemon(-1))
  const [moreLoadingPressed, setMoreLoadingPressed] = useState<boolean>(false)

  useEffect(() => {
    console.log('useEffect once vala')
  }, [])

  useEffect(() => {
    console.log('useEffect')
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
    // if (props.loading) { return }
    if (intersecObserver.current != null) { intersecObserver.current.disconnect() }

    intersecObserver.current = new IntersectionObserver(pokemons => {
      if (pokemons[0].isIntersecting) {
        console.log('We are possibaly at the last Pokemon')
        if (moreLoadingPressed) { loadMorePokemon() }
      }
    })

    if (pokemonEle) { intersecObserver.current.observe(pokemonEle) }
  }, [loadMorePokemon])

  let PokedexPlaceholderLayout = null
  let MoreLoadingLayout = null

  // if (!moreLoadingPressed && props.loading) {
  //   PokedexPlaceholderLayout = <Loader />
  // } else if (error != null) {
  //   PokedexPlaceholderLayout = <AlertMessage message={`No data available for now. Please check your internet connection: ${error.message}`} />
  // } else if ((data != null) && data.allPokemon) {
  //   dispatch(putPokemonList(data.allPokemon))
  // }

  if (queryPokemons && queryPokemons.length > 0 && queryPokemons[0].id !== '0') {
    PokedexPlaceholderLayout = <Row className='d-flex justify-content-center'>
    {queryPokemons.map((pokemon, index) => {
      if (queryPokemons.length === index + 1) {
        return (
          <PokemonCardWrapper key={pokemon.id} ref={lastPokemonRef} frontDefault={pokemon.sprites.front_default} backDefault={pokemon.sprites.back_default} name={pokemon.name} id={pokemon.id} types={pokemon.types} />
        )
      }
      return (
        <PokemonCardWrapper key={pokemon.id} frontDefault={pokemon.sprites.front_default} backDefault={pokemon.sprites.back_default} name={pokemon.name} id={pokemon.id} types={pokemon.types} />
      )
    })}</Row>
  }

  if (!moreLoadingPressed) {
    // if (!moreLoadingPressed && !props.loading) {
    MoreLoadingLayout = <LoadMore loadMorePokemon={loadMorePokemon} showLoadMoreButton={true} />
  } else {
    // else if (moreLoadingPressed && props.loading) {
    MoreLoadingLayout = <LoadMore loadMorePokemon={loadMorePokemon} showLoadMoreButton={false} />
  }

  return (
    <>
      {
        (!props.loading)
          ? (
          <Row className="justify-content-center p-1 mb-4">
        <Search searchPokemon={searchPokemon} setSearchWord={(value: string) => { setSearchWord(value) } }/>
        <PokemonFilter filterPokemonByType={filterPokemonByType} />
      </Row>
            )
          : null
      }

      {PokedexPlaceholderLayout}
      {queryPokemons && queryPokemons.length > 11 && MoreLoadingLayout}
      </>
  )
}

export default App
