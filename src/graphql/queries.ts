import { gql } from '@apollo/client/core';

const limit: number = 12;
const isFilter: boolean = false;

export const POKEMONS = gql`
{
  allPokemon(limit: ${limit}, filter: ${isFilter}) {
    id,
    name,
    types {
      id,
      name
    },
    sprites {
      front_default,
      back_default    
    }
  }
}`;

export const getMorePokemon = (limit: number) => {
  return gql`
  {
    allPokemon(limit: ${limit}) {
      id,
      name,
      types {
        id,
        name
      },
      sprites {
        front_default,
        front_shiny, 
        back_default,
        back_shiny
      }
    }
  }`;
}