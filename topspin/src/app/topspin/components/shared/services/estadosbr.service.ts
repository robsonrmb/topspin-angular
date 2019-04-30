import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosbrService {

  constructor(private http: Http) { }

  getEstadosBR() {
    return this.http.get('assets/dados/estadosbr.json')
      .map((res: Response) => res.json());
  }
}
