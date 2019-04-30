import { Injectable } from '@angular/core';
import { ErroGlobal } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ErroService {

  private erroGlobal: ErroGlobal = new ErroGlobal()

  constructor() { }

  getErroGlobal(): ErroGlobal {
    return this.erroGlobal;
  }
  
  setErroGlobal(status: string,
                mensagem: string,
                data: string,
                causa: string,
                path: string,
                stackTrace: string) {

      this.erroGlobal.status = status;
      this.erroGlobal.mensagem = mensagem;
      this.erroGlobal.data = data;
      this.erroGlobal.causa = causa;
      this.erroGlobal.path = path;
      this.erroGlobal.stackTrace = stackTrace;
  }

  getMensagem(): String {
    return this.erroGlobal.mensagem;
  }
  setMensagem(msg: string) {
    this.erroGlobal.mensagem = msg;
  }

  getStatus(): String {
    return this.erroGlobal.status;
  }
  setStatus(status: string) {
    this.erroGlobal.status = status;
  }

  getData(): String {
    return this.erroGlobal.data;
  }
  setData(data: string) {
    this.erroGlobal.data = data;
  }

  getCausa(): String {
    return this.erroGlobal.causa;
  }
  setCausa(causa: string) {
    this.erroGlobal.causa = causa;
  }

  getPath(): String {
    return this.erroGlobal.path;
  }
  setPath(path: string) {
    this.erroGlobal.path = path;
  }

  getStackTrace(): String {
    return this.erroGlobal.stackTrace;
  }
  setStackTrace(st: string) {
    this.erroGlobal.stackTrace = st;
  }
}
