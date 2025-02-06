
export interface PokeDetailView {
    name: string,
    pokeSprite: string,
    id: number,
    weight:number,
    height: number,
    firstTypeSprite:string
    secondTypeSprite?:string
    description:{
        "esText": string,
        "enText": string
    },
    stats:{
        "hp":number,
        "attack": number,
        "defense": number,
        "special-attack": number,
        "special-defense": number,
        "speed": number
    }
}
