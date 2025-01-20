import { PokemonDetail, PokemonSpecies, PokemonType } from "./poke-api.interface"

export interface pokeCardList {

    name: string,
    pokeSprite: string,
    id: number,
    color: string,
    firstTypeSprite:string
    secondTypeSprite?:string
}

export interface TempJsonList {
    tempJsonList: any[]

    detail:PokemonDetail,
    type:PokemonType,
    specie:PokemonSpecies

}