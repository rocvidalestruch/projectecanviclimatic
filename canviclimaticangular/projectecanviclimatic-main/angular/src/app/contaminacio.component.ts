import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contaminacio',
  standalone: true,
  imports: [CommonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './contaminacio.html',
  styleUrls: ['./contaminacio.css']
})
export class ContaminacioComponent {
  indicadors = [
    {
      nom: "Qualitat de l'aire (NO₂)",
      percentatge: 65,
      dato: "Malgrat l'activació de la ZBE, l'estació de l'Eixample va tornar a superar el límit legal anual de la UE el 2023. La densitat del trànsit dièsel i la manca de renovació del parc mòbil mantenen els nivells crítics en hores punta."
    },
    {
      nom: 'Partícules PM2.5',
      percentatge: 42,
      dato: "Els episodis d'inversió tèrmica a l'hivern i l'activitat creixent al Port de Barcelona han disparat les micropartícules. A més, les intrusions de pols sahariana són cada cop més freqüents i intenses degut al canvi climàtic."
    },
    {
      nom: 'Ozó troposfèric',
      percentatge: 78,
      dato: "L'augment de les onades de calor extremes des de 2020 actua com a catalitzador químic amb els fums del trànsit. Això genera pics tòxics a la tarda que no només afecten la ciutat, sinó que es desplacen cap a la Plana de Vic."
    },
    {
      nom: 'Soroll urbà',
      percentatge: 55,
      dato: "Barcelona és la setena ciutat més sorollosa del món segons l'OMS. El 57% dels veïns viuen exposats a nivells superiors als recomanats, principalment pel trànsit rodat i l'auge de l'oci nocturn a les terrasses post-pandèmia."
    }
  ];
}


