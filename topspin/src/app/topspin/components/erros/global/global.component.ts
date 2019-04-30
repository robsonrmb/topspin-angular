import { Component, OnInit } from '@angular/core';
import { ErroGlobal } from 'src/app/topspin/models';
import { ErroService } from 'src/app/topspin/services';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  erroGlobal: ErroGlobal;

  constructor(private erroService: ErroService) { }

  ngOnInit() {
    this.erroGlobal = this.erroService.getErroGlobal();
  }

}
