import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalitzar', standalone: true })
export class CapitalitzarPipe implements PipeTransform {
  transform(valor: string): string {
    if (!valor) return '';
    return valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
  }
}
