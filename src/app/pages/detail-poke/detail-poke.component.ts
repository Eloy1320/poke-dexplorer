import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detail-poke',
  templateUrl: './detail-poke.component.html',
  styleUrl: './detail-poke.component.scss',
  standalone: true,
  imports: [
    CardModule,
    ProgressBarModule,
    ButtonModule
  ],
})
export class DetailPokeComponent {

  idPoke!:number

  constructor(
      private route: ActivatedRoute,
      private router: Router,
    ){

  }

  ngOnInit(){
    
    this.route.paramMap.subscribe(params => {
      let tempId = params.get('id') || '';
      
      if (!tempId || isNaN(Number(tempId))) {
        console.log("id no valido", Number(tempId));
      }else{
        this.idPoke = Number(tempId);
      }

    });

  }

  getStatPercentage(value: number): number {
    const maxStatValue = 255;
    return (value / maxStatValue) * 100;
  }

}
