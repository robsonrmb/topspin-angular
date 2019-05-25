import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  gerarNovaSenha(email: string): Observable<boolean> {
    alert(`${email} - ${environment.recurso_url.autenticacao}/nova_senha`);
    return this.http.post<boolean>(`${environment.recurso_url.autenticacao}/nova_senha`, email)
                    .map(response => true)
                    .catch(error => throwError(error));
  }
}
