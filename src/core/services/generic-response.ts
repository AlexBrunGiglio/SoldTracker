export class GenericResponse<T = any> {
    success = false;
    message?: string;
    originError?: any;
    errorCode?: any;
    data?: T;
    handleError(err) {
        this.originError = err;
        this.success = false;
        if (typeof err === 'string' || typeof err === 'number' || typeof err === 'boolean') { this.message = 'Error : ' + err; }
        else if (err.message) { this.message = err.message; }
        else if (err.errorMessage) { this.message = err.errorMessage; }
        else { this.message = 'Une erreur est survenue.'; }
        console.log(err);
    }
}
