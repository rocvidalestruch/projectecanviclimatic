import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recursos.html',
  styleUrls: ['./recursos.css']
})
export class RecursosComponent {
  categories = [
    {
      nom: 'Guies',
      recursos: [
        { titol: 'Guia d\'estalvi energètic domèstic', text: 'Guia completa amb consells pràctics per reduir el consum energètic a casa.', font: 'Ajuntament de Barcelona', any: '2024', url: '#', tipus: 'PDF' },
        { titol: 'Manual de reciclatge a Barcelona', text: 'Explicació detallada de com separar correctament els residus segons la normativa local.', font: 'AMB (Àrea Metropolitana de Barcelona)', any: '2024', url: '#', tipus: 'PDF' }
      ]
    },
    {
      nom: 'Datasets',
      recursos: [
        { titol: 'Dades de qualitat de l\'aire (Open Data BCN)', text: 'Dataset obert amb dades històriques de qualitat de l\'aire a Barcelona.', font: 'Open Data BCN', any: '2024', url: '#', tipus: 'CSV' },
        { titol: 'Consum d\'aigua per barris', text: 'Estadístiques de consum d\'aigua desglossades per barris de Barcelona.', font: 'Aigües de Barcelona', any: '2023', url: '#', tipus: 'JSON' }
      ]
    },
    {
      nom: 'Projectes locals',
      recursos: [
        { titol: 'Barcelona + Sostenible', text: 'Programa municipal per promoure la sostenibilitat i l\'acció climàtica ciutadana.', font: 'Ajuntament de Barcelona', any: '2024', url: '#', tipus: 'Web' },
        { titol: 'Refugis climàtics', text: 'Xarxa d\'espais públics adaptats per fer front a les ones de calor.', font: 'Ajuntament de Barcelona', any: '2024', url: '#', tipus: 'Web' }
      ]
    },
    {
      nom: 'Normativa',
      recursos: [
        { titol: 'Zona de Baixes Emissions (ZBE)', text: 'Normativa sobre restriccions de circulació de vehicles a Barcelona.', font: 'AMB', any: '2024', url: '#', tipus: 'Web' },
        { titol: 'Ordenança de gestió de residus', text: 'Normativa municipal sobre separació i gestió de residus domèstics.', font: 'Ajuntament de Barcelona', any: '2023', url: '#', tipus: 'PDF' }
      ]
    }
  ];
}
