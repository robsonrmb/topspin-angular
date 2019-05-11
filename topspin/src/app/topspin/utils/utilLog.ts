import { ExceptionTS } from "../models";

export class UtilLog {

    static buscaMensagemDoErro(error: any, msg?: string) {
        if (error.error.error) {// Se existe a propriedade error (exceção angular)
            return error.error.message;
        }else if (error.error) {// (exceção topspin)
            return error.error.msg;
        }else{
            return msg;
        }
        /*
        if (e.error) {// Se existe a propriedade error (exceção angular)
            return e.error.message;       
        }else{
            return msg;
        }
        */
    }
    
    static imprimeLogConsole(exibeLog: boolean, error: any) {
        if (exibeLog) {
            if (error.error.error) {
                console.log('UTIL_LOG (ANGULAR): ', error);
                console.log("LOG FOR DEVELOPER\n");
                console.log("Código de erro: ", error.status);
                console.log("URL: ", error.url);
                console.log("Stack Trace: ", error.error.stackTrace);

            }else{
                console.log('UTIL_LOG (TOPSPIN): ', error);
                console.log("LOG FOR DEVELOPER\n");
                console.log("Código de erro: ", error.status);
                console.log("Mensagem: ", error.error.msg);
                console.log("Causa: ", error.error.cause);
                console.log("Stack Trace: ", error.error.stackTrace);
            }
        }
    }

}