import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from './headers.component';
import { AvaliacaoService } from '../../services';

@NgModule({
  declarations: [
    HeadersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeadersComponent
  ],
  providers: [
    AvaliacaoService
  ]
})
export class HeadersModule { }
