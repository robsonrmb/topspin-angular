import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EstatisticasComponent } from './estatisticas.component';
import { EstatisticaService, UsuarioService } from '../../services';

@NgModule({
  declarations: [
    EstatisticasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    EstatisticaService,
    UsuarioService
  ]
})
export class EstatisticasModule { }
