import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.css']
})
export class FormDebugComponent implements OnInit {

  @Input() form
  ambiente_producao: boolean
  
  constructor() { }

  ngOnInit() {
    this.ambiente_producao = environment.production
  }

  rendered(): boolean {
    return (this.form && !this.ambiente_producao);
  }

}
