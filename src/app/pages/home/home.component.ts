import { SlicePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { pokeCardList } from '@app/interfaces/home.interface';
import { PokemonApiService } from '@app/services/pokemon-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { POKEMON_COLORS } from 'src/utils/constants/constants';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TranslateModule,
    TitleCasePipe,
    SlicePipe,
    ProgressSpinnerModule,
    ButtonModule
  ],
})
export class HomeComponent {

  private next!:string | null;
  private previous!:string | null;
  private i: number = 1;
  private limit:number = 12;

  pokeCardList: pokeCardList[] = [];
  

  showSpinner:boolean = true;
  isDisabledLoadPokemonBtn:boolean = false;
  
  constructor(
    private pokemonApiService: PokemonApiService
  ){

  }

  ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList(){

    this.showSpinner = true;
    this.isDisabledLoadPokemonBtn = true;
    
    let observables = [];

    for (let index = this.i; index <= this.limit; index++) {
      let tempJsonList: any = {};
      
      const tempObservable = this.pokemonApiService.getDetailPokemon(index).pipe(
        switchMap(response1 => {
          tempJsonList.detail = response1;
    
          const typeUrls = response1.types.map((t: { type: { url: any; }; }) => t.type.url);
          return forkJoin(typeUrls.map((url: string) => this.pokemonApiService.getUrlPokemon(url)));
        }),
        switchMap(response2 => {
          tempJsonList.type = response2;
          return this.pokemonApiService.getColorPokemon(index);
        }),
        map(response3 => {
          tempJsonList.color = response3;
          return tempJsonList;
        })
      );
      
      observables.push(tempObservable);
    }

    forkJoin(observables).subscribe({
      next: (finalResults) => {
        finalResults.forEach(final => {
          let codigoColor = final.color.color.name as keyof typeof POKEMON_COLORS;
    
          this.pokeCardList.push(
            {
              name: final.detail.name,
              pokeSprite: final.detail.sprites.other.home.front_default,
              id: final.detail.id,
              color: `background-color: ${POKEMON_COLORS[codigoColor]};`,
              firstTypeSprite: final.type[0].sprites["generation-vi"]["omega-ruby-alpha-sapphire"]["name_icon"],
              secondTypeSprite: final.type.length >= 2 ? final.type[1].sprites["generation-vi"]["omega-ruby-alpha-sapphire"]["name_icon"] : null
            }
          );
        });
      },
      error: (err) => {
        this.showSpinner = false;
        this.isDisabledLoadPokemonBtn = false;
        console.error('Error occurred:', err)
      },
      complete: () =>{
        console.log('All requests completed')
        this.showSpinner = false;
        this.isDisabledLoadPokemonBtn = false;
        this.i = this.i + 12;
        this.limit = this.limit + 12;
        this.pokeCardList.sort((a, b) => a.id - b.id);
      } 
    });


  }

}
