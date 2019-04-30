import { Component, OnInit, Input } from '@angular/core';
import { Mensagem } from '../../../models';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  @Input() mensagem: Mensagem

  constructor() { }

  ngOnInit() {
  }

}
