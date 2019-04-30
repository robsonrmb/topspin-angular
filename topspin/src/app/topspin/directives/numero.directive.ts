import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[somenteNumeros]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDirective,
    multi: true
  }]
})
export class NumeroDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event'])
  onkeyup($event: any) {
    let valor = $event.target.value;
    valor = valor.replace(/[\D]/g, '');
    if (valor == '') {
      valor = 0;
    }
    $event.target.value = valor;
    this.onChange(valor);
  }

  //Registra valor a ser chamada para atualizar valor na model.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  //Registra valor a ser chamada para atualizar valor na model PARA EVENTO ONCHANGE.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  //Obtém o valor contido na model.
  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

}
