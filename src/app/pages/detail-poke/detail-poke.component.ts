import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { PokemonApiService } from '@app/services/pokemon-api.service';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { PokeDetailView } from '@app/interfaces/detail-poke.interface';
import { DecimalPipe, TitleCasePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslateModule } from '@ngx-translate/core';
import { ROUTER_VALUES } from 'src/utils/constants/constants';
import { LanguageService } from '@app/services/language.service';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage.service';


@Component({
  selector: 'app-detail-poke',
  templateUrl: './detail-poke.component.html',
  styleUrl: './detail-poke.component.scss',
  standalone: true,
  imports: [
    CardModule,
    ProgressBarModule,
    ButtonModule,
    DecimalPipe,
    ProgressSpinnerModule,
    TitleCasePipe,
    SlicePipe,
    UpperCasePipe,
    TranslateModule,
    RouterModule
  ],
})
export class DetailPokeComponent implements OnDestroy  {

  idPoke!:number;

  pokeDetailView!:PokeDetailView;

  showSpinner: boolean = true;

  maxPokemon!:number;

  showErroMessage:boolean = false;

  private langSubscription!: Subscription;
  
  currenLang!:string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private pokemonApiService: PokemonApiService,
      private languageService: LanguageService,
      private localStorageService: LocalStorageService
    ){

  }

  ngOnInit(){

    this.currenLang = this.localStorageService.getLanguage();

    this.langSubscription = this.languageService.languageChange$.subscribe(lang => {
      this.currenLang = lang;
    });
    
    this.route.paramMap.subscribe(params => {
      let tempId = params.get('id') || '';
      
      if (!tempId || isNaN(Number(tempId))) {
        console.log("id no valido", Number(tempId));
        this.showSpinner = false;
        this.showErroMessage = true;
      }else{
        this.idPoke = Number(tempId);
        this.loadMaxPokemon();
        this.loadPokemonDetail(this.idPoke);
      }

    });

  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }

  private loadPokemonDetail(id:number){

    this.showSpinner = true;

    let tempJsonList: any = {};

    const tempObservable = this.pokemonApiService
        .getDetailPokemon(id)
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
            return this.pokemonApiService.getSpeciesPokemon(id);
          }),
          map((response3) => {
            tempJsonList.species = response3;
            return tempJsonList;
          })
        );

    let subscribeTemp = tempObservable.subscribe({
          next: (final) => {
            console.log(final)

            const statsJson = final.detail.stats.reduce((acc: { [x: string]: any; }, stat: { stat: { name: string | number; }; base_stat: any; }) => {
              acc[stat.stat.name] = stat.base_stat;
              return acc;
            }, {});
          
            const spanishText = final.species.flavor_text_entries.find((item: { language: { name: string; }; }) => item.language.name === "es");
            const englishText = final.species.flavor_text_entries.find((item: { language: { name: string; }; }) => item.language.name === "en");

            let flavortText: any  = { 
              esText: spanishText == undefined ? "" : spanishText.flavor_text,
              enText: englishText == undefined ? "" : englishText.flavor_text
            }

            flavortText.enText = flavortText.enText.replace(/[\x00-\x1F\x7F]/g, '').replace(/\s+/g, ' ').trim();

            this.pokeDetailView = {
              id: this.idPoke,
              name: final.detail.name,
              pokeSprite: final.detail.sprites.other.home.front_default,
              weight: this.hectogramsToKilograms(final.detail.weight),
              height: this.decimetersToMeters(final.detail.height),
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
              stats: statsJson,
              description: flavortText
            }

          },
          error: (err) => {
            console.error('Error occurred:', err);
            this.showSpinner = false;
            this.showErroMessage = true;
            subscribeTemp.unsubscribe();
          },
          complete: () => {
            this.showSpinner = false;
            subscribeTemp.unsubscribe();
          },
        });

  }

  private loadMaxPokemon(){

    let subscribeTemp = this.pokemonApiService.getPokemonList(1).subscribe({
      next: (res:any) => {
        this.maxPokemon = res.count;
      },
      error: (err) => {
        console.error('Error occurred:', err);
        subscribeTemp.unsubscribe();
      },
      complete: () => {
        subscribeTemp.unsubscribe();
      },
    });

  }

  private decimetersToMeters(deci:number){
    return  this.round(deci/10, 2);
  }

  private hectogramsToKilograms(deci:number){
    return  this.round(deci/10, 1);
  }

  statPercentage(value: number): number {
    const maxStatValue = 255;
    return (value / maxStatValue) * 100;
  }

  private round(value: number, decimals = 2): number {
    return Number(
      Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals
    );
  }

  handleClickPrevious(){
    this.router.navigate([ROUTER_VALUES.DETAIL, this.idPoke - 1]);
  }

  handleClickNext(){
    this.router.navigate([ROUTER_VALUES.DETAIL, this.idPoke + 1]);
  }

}
