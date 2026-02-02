import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maiuscules', standalone: true })
export class MaiusculesPipe implements PipeTransform {
  transform(valor: string): string {
    if (!valor) return '';
    return valor.toUpperCase();
  }
}
