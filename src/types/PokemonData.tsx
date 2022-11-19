import { PokemonType } from "./PokemonType";
import { Sprites } from "./Sprites";

export interface PokemonData {
    id: string;
    name: string;
    types: Array<PokemonType>;
    sprites: Sprites;
  }