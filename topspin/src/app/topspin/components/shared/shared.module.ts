import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MensagensComponent } from './mensagens';
import { RatingComponent } from './rating';
import { FormDebugComponent } from './form-debug';
import { EstadosbrService } from './services/estadosbr.service';

@NgModule({
  declarations: [
    MensagensComponent,
    RatingComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    MensagensComponent,
    RatingComponent,
    FormDebugComponent
  ],
  providers: [
    EstadosbrService
  ]
})
export class SharedModule { }
