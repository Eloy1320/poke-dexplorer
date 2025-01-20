
export interface PokemonResult {
    name: string;
    url: string;
}

export interface PokemonDetail {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: PokemonSprites;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
    moves: PokemonMove[];
}

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    [key: string]: string | null;
}

export interface PokemonType {
    slot: number;
    type: PokemonResult;
}

export interface PokemonAbility {
    ability: PokemonResult;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: PokemonResult;
}

export interface PokemonMove {
    move: PokemonResult;
    version_group_details: MoveVersionDetail[];
}

export interface MoveVersionDetail {
    level_learned_at: number; 
    move_learn_method: PokemonResult;
    version_group: PokemonResult;
}

export interface PokemonSpecies {
    base_happiness: number;
    capture_rate: number;
    color: NamedAPIResource;
    egg_groups: NamedAPIResource[];
    evolution_chain: { url: string };
    evolves_from_species: NamedAPIResource | null;
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: any[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genus[];
    generation: NamedAPIResource;
    growth_rate: NamedAPIResource;
    habitat: NamedAPIResource | null;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    pal_park_encounters: PalParkEncounter[];
    pokedex_numbers: PokedexNumber[];
    shape: NamedAPIResource;
    varieties: PokemonVariety[];
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
}

export interface Genus {
    genus: string;
    language: NamedAPIResource;
}

export interface Name {
    language: NamedAPIResource;
    name: string;
}

export interface PalParkEncounter {
    area: NamedAPIResource;
    base_score: number;
    rate: number;
}

export interface PokedexNumber {
    entry_number: number;
    pokedex: NamedAPIResource;
}

export interface PokemonVariety {
    is_default: boolean;
    pokemon: NamedAPIResource;
}
