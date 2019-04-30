import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from '../environments/environment';
import { ErroService } from "./topspin/services";

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

    constructor(private injector: Injector,
                private erroService: ErroService){}

    handleError(error: any) {
        if (!environment.production) {
            console.log(error);
        }
        switch (error.status) {
            case 400:
                this.carregarServico(error);    
                this.injector.get(Router).navigate(['/erro-global']);
                break;

            case 401:
                this.injector.get(Router).navigate(['/login']);
                break;
                
            case 404:
                this.carregarServico(error);
                this.injector.get(Router).navigate(['/erro-global'])
                break;
        }
        //handleError(error)
    }

    private carregarServico(error: any) {
        let json = JSON.parse(error._body);
        this.erroService.setErroGlobal(error.status, 
                                       json.msgs, 
                                       json.date, 
                                       json.causa, 
                                       json.path, 
                                       json.stackTrace)
        /*
        this.erroService.setStatus(error.status)
        this.erroService.setMensagem(json.msgs)
        this.erroService.setData(json.date)
        this.erroService.setCausa(json.causa)
        this.erroService.setPath(json.path)
        this.erroService.setStackTrace(json.stackTrace)
        */
                
    }

}


