import { FormArray, FormControl, AbstractControl } from "@angular/forms";
import { ExceptionTS } from "../models";

export class UtilLog {

    static buscaMensagemDoErro(error: ExceptionTS) {
        if (error.error) {
            if (error.error.msg) {
                return error.error.msg;
            }else{
                return error.message;
            }
        }else{
            return '';
        }
    }
    
    static imprimeLogConsole(exibeLog: boolean, error: ExceptionTS) {
        if (exibeLog) {
            console.log(error);
            console.log("LOG FOR DEVELOPER\n");
            console.log("Código de erro: ", error.status);
            console.log("URL: ", error.url);
            console.log("Stack Trace: ", error.error.stackTrace);
        }
    }

}