import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalComponent } from './external.component';

@NgModule({
  declarations: [
    ExternalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExternalComponent
  ]
})
export class ExternalModule { }
