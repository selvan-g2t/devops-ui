import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Injectable()
export class ExceptionHandlingService {

    constructor(public toastr: ToastsManager) { }
    errorHandling(data) {
        return new Promise((resolve, reject) => {
            let errorResponse = data.error;
            this.toastr.error(errorResponse.errorMessage);
            let errorObj = {};
            if (typeof errorResponse.violations != "undefined" || errorResponse.violations !== null) {
                for (var i = 0; i < errorResponse.violations.length; i++) {
                    let violations = errorResponse.violations[i];
                    errorObj[violations['fieldName']] = { errorMessage: violations['errorMessage'] }
                }
                resolve(errorObj)
            }
        });
    }

}