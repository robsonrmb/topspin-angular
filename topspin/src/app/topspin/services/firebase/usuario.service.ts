import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Usuario } from '../../models';
import { RECURSO_URL_USUARIOS } from '../../constantes';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFireDatabase) { }

  incluir(usuario: Usuario) {
    console.log(usuario)
    usuario = {
      nome: 'zzzzzzz',
      email: 'zzz@zzz.com'
    }
    this.db.list('usuarios').push(usuario)
      .then((result: any) => {
        console.log(result.key)
      });
  }

  alterar(usuario: Usuario, id: string) {
    usuario = {
      nome: 'zzzzzzz1',
      email: 'zzz@zzz.com.br'
    }
    id='-LTKfvmn1rI7jnGSJVfg';
    this.db.list('usuarios').update(id, usuario)
      .catch((error: any) => {
        console.log(error)
      });
  }

  buscaPorId() {

  }

  buscaTodos() {
    return this.db.list("usuarios")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({id: c.payload.key, ...c.payload.val()}));
        })
      );
  }

  buscaPorEstado() {

  }

  buscaPorEstadoENome() {
    
  }

  delete(id: string) {
    this.db.object('usuarios/${id}').remove();
  }

}
