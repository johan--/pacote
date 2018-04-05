import { Injectable } from '@angular/core';
import { FormioResourceConfig } from 'angular-formio/resource';
import { DocumentoService } from './services/documento.service';

@Injectable()
// export class AppResourceConfig{
export class AppResourceConfig extends FormioResourceConfig{
    name: string;
    form: string;
    parents: string[];
    errorMessage: any;
    
    constructor(private service:DocumentoService){
        super();
        console.log('ACA ESTAMOS')
        this.service.getFormulario()
            .subscribe(data => {
            this.name = data.name;
            this.form = data.form
            }, error => this.errorMessage = <any>error);
    }
}
