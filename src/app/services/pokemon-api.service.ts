import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonDetail, PokemonSpecies } from '@app/interfaces/poke-api.interface';
import { Observable } from 'rxjs';
import { BASE_API_POKE } from 'src/utils/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private http:HttpClient) { }

  getDetailPokemon(id:number): Observable<any>{
    return this.http.get<any>(BASE_API_POKE + `pokemon/${id}`);
  }

  getUrlPokemon(url:string){
    return this.http.get<any>(url);
  }

  getColorPokemon(id:number): Observable<PokemonSpecies>{
    return this.http.get<PokemonSpecies>(BASE_API_POKE + `pokemon-species/${id}`);
  }

}
