import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sobre.html',
  styleUrls: ['./sobre.css']
})
export class SobreComponent {
  projectInfo = {
    nom: 'ClimaBCN — Aprèn i Actua',
    descripcio: 'Plataforma educativa dissenyada per transformar la consciència climàtica en acció, oferint els coneixements, eines i recursos necessaris per entendre la crisi climàtica i participar activament en les solucions.',
    objectiu: 'Fer la ciència del clima comprensible, accessible i accionable per a estudiants, professorat i qualsevol persona interessada en el futur del planeta.'
  };

  metodologia = [
    {
      titol: 'Fonts de dades',
      descripcio: 'Utilitzem dades de fonts públiques i verificades com Open Data BCN, APIs públiques de qualitat de l\'aire i informes científics revisats per experts.'
    },
    {
      titol: 'Actualització',
      descripcio: 'Les dades es revisen i actualitzen periòdicament. Cada dada inclou la seva font i data d\'actualització per garantir la transparència.'
    },
    {
      titol: 'Educació',
      descripcio: 'El contingut està dissenyat per ser comprensible sense perdre rigor científic. Cada concepte complex s\'explica amb exemples pràctics i visuals.'
    }
  ];

  credits = [
    {
      categoria: 'Desenvolupament',
      items: ['Angular', 'Codi a GitHub']
    },
    {
      categoria: 'Fonts de dades',
      items: ['Open Data BCN', 'World Air Quality Index (WAQI)', 'Ajuntament de Barcelona', 'Àrea Metropolitana de Barcelona (AMB)']
    },
    {
      categoria: 'Recursos gràfics',
      items: ['Bootstrap Icons', 'Il·lustracions pròpies']
    }
  ];
}

