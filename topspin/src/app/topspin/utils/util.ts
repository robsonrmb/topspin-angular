import { FormArray, FormControl, AbstractControl } from "@angular/forms";
import { ExceptionTS } from "../models";

export class Util {

    static imprimeLogConsole(exibeLog: boolean, error: ExceptionTS) {
        if (exibeLog) {
            console.log(error);
            console.log("LOG FOR DEVELOPER\n");
            console.log("Código de erro: ", error._body.status);
            console.log("URL: ", error.url);
            console.log("Stack Trace: ", error._body.stackTrace);
        }
    }

    static converteData_ddMMyyyy_para_yyyyMMdd(data: string): string {
        let dataF = data.substring(6) + '-' +
				    data.substring(3,5) + '-' +
					data.substring(0,2);
        console.log(dataF);
        return dataF;
    }

    static converteData_yyyyMMdd_para_ddMMyyyy(data: string): string {
        let dataF = data.substring(8) + '/' +
				    data.substring(5,7) + '/' +
					data.substring(0,4);
        console.log(dataF);
        return dataF;
    }

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {
            /*
            const values = formArray.controls;
            let totalChecked = 0;
            for (let i=0; i<values.length; i++) {
                if (values[i].value) {
                    totalChecked += 1;
                }
            }
            */
            const totalChecked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total + current : total, 0);
            return totalChecked >= min ? null : { required: true };
        };
        return validator;
    }

    static cepValidator(control: FormControl) {
        const cep = control.value;
        if (cep && cep !== '') {
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido : true };
        }
    }

    static equalsToEmail(group: AbstractControl): {[key: string] : boolean} {
        const email = group.get('email');
        const emailConfirmation = group.get('apelido'); //utilizaria o campo de confirmação de email.

        if (!email || !emailConfirmation) {
            return undefined;
        }
        if (email.value !== emailConfirmation.value) {
            return {emailsNotMatch:true}
        }
        return undefined;
    }

}