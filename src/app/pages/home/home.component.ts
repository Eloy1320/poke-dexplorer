import { SlicePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { pokeCardList } from '@app/interfaces/home.interface';
import { PokemonApiService } from '@app/services/pokemon-api.service';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { forkJoin, map, switchMap } from 'rxjs';
import { POKEMON_COLORS, ROUTER_VALUES } from 'src/utils/constants/constants';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    TranslateModule,
    TitleCasePipe,
    SlicePipe,
    ProgressSpinnerModule,
    ButtonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
})
export class HomeComponent {
  private i: number = 1;
  private limit: number = 12;

  private pokeListSearch: any;

  pokeCardList: pokeCardList[] = [];

  searchPokemon: string = '';
  showSpinner: boolean = true;
  isDisabledLoadPokemonBtn: boolean = false;

  constructor(
    private pokemonApiService: PokemonApiService,
    private router:Router
  ) {}

  ngOnInit() {
    this.loadPokemonCardList();
    this.loadPokemonListSearch();
  }

  loadPokemonCardList() {
    this.showSpinner = true;
    this.isDisabledLoadPokemonBtn = true;

    let observables = [];

    for (let index = this.i; index <= this.limit; index++) {
      let tempJsonList: any = {};

      const tempObservable = this.pokemonApiService
        .getDetailPokemon(index)
        .pipe(
          switchMap((response1) => {
            tempJsonList.detail = response1;

            const typeUrls = response1.types.map(
              (t: { type: { url: any } }) => t.type.url
            );
            return forkJoin(
              typeUrls.map((url: string) =>
                this.pokemonApiService.getUrlPokemon(url)
              )
            );
          }),
          switchMap((response2) => {
            tempJsonList.type = response2;
            return this.pokemonApiService.getColorPokemon(index);
          }),
          map((response3) => {
            tempJsonList.color = response3;
            return tempJsonList;
          })
        );

      observables.push(tempObservable);
    }

    forkJoin(observables).subscribe({
      next: (finalResults) => {
        finalResults.forEach((final) => {
          let codigoColor = final.color.color
            .name as keyof typeof POKEMON_COLORS;

          this.pokeCardList.push({
            name: final.detail.name,
            pokeSprite: final.detail.sprites.other.home.front_default,
            id: final.detail.id,
            color: `background-color: ${POKEMON_COLORS[codigoColor]};`,
            firstTypeSprite:
              final.type[0].sprites['generation-vi'][
                'omega-ruby-alpha-sapphire'
              ]['name_icon'],
            secondTypeSprite:
              final.type.length >= 2
                ? final.type[1].sprites['generation-vi'][
                    'omega-ruby-alpha-sapphire'
                  ]['name_icon']
                : null,
          });
        });
      },
      error: (err) => {
        this.showSpinner = false;
        this.isDisabledLoadPokemonBtn = false;
        console.error('Error occurred:', err);
      },
      complete: () => {
        this.showSpinner = false;
        this.isDisabledLoadPokemonBtn = false;
        this.i = this.i + 12;
        this.limit = this.limit + 12;
        this.pokeCardList.sort((a, b) => a.id - b.id);
      },
    });
  }

  onSearchPokemon() {
    if (this.searchPokemon == '') {
      this.i = 1;
      this.limit = 12;
      this.pokeCardList = [];
      this.loadPokemonCardList();
    } else {
      let filteredPokemonList = this.pokeListSearch.filter(
        (pokemon: { name: string }) =>
          pokemon.name.toLowerCase().includes(this.searchPokemon.toLowerCase())
      );

      console.log(filteredPokemonList);
      this.loadPokemonSearchCardList(filteredPokemonList);
    }
  }

  loadPokemonSearchCardList(filteredPokemonList: any) {
    this.showSpinner = true;
    this.isDisabledLoadPokemonBtn = true;
    this.pokeCardList = [];

    let observables = [];

    for (let value of filteredPokemonList) {
      let tempJsonList: any = {};

      const tempObservable = this.pokemonApiService
        .getDetailPokemon(value.name)
        .pipe(
          switchMap((response1) => {
            tempJsonList.detail = response1;

            const typeUrls = response1.types.map(
              (t: { type: { url: any } }) => t.type.url
            );
            return forkJoin(
              typeUrls.map((url: string) =>
                this.pokemonApiService.getUrlPokemon(url)
              )
            );
          }),
          switchMap((response2) => {
            tempJsonList.type = response2;
            return this.pokemonApiService.getUrlPokemon(
              tempJsonList.detail.species.url
            );
          }),
          map((response3) => {
            tempJsonList.color = response3;
            return tempJsonList;
          })
        );

      observables.push(tempObservable);
    }

    forkJoin(observables).subscribe({
      next: (finalResults) => {
        finalResults.forEach((final) => {
          let codigoColor = final.color.color
            .name as keyof typeof POKEMON_COLORS;

          this.pokeCardList.push({
            name: final.detail.name,
            pokeSprite: final.detail.sprites.other.home.front_default,
            id: final.detail.id,
            color: `background-color: ${POKEMON_COLORS[codigoColor]};`,
            firstTypeSprite:
              final.type[0].sprites['generation-vi'][
                'omega-ruby-alpha-sapphire'
              ]['name_icon'],
            secondTypeSprite:
              final.type.length >= 2
                ? final.type[1].sprites['generation-vi'][
                    'omega-ruby-alpha-sapphire'
                  ]['name_icon']
                : null,
          });
        });
      },
      error: (err) => {
        this.showSpinner = false;
        console.error('Error occurred:', err);
      },
      complete: () => {
        this.showSpinner = false;
        this.pokeCardList.sort((a, b) => a.id - b.id);
      },
    });
  }

  loadPokemonListSearch() {
    this.pokemonApiService.getPokemonList(1500).subscribe({
      next: (res) => {
        this.pokeListSearch = res;
        this.pokeListSearch = this.pokeListSearch.results;
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }

  handleCardPoke(id:number){
    this.router.navigate([ROUTER_VALUES.DETAIL, id]);

  }

}
