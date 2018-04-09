import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

import { IDocumento } from '../../../interfaces/IDocumento';
import { DocumentoService } from '../../../services/documento.service';
import { AppResourceConfig } from '../../../app-resource-config';

import {
  FormioResourceCreateComponent,
  FormioResourceService,
  FormioResourceConfig
} from 'angular-formio/resource';

 
const URL = 'create';
const apiFormUrl = 'http://localhost:3001/';  // URL to web api

@Component({
  selector: 'documento-create',
  templateUrl: './documento-create.component.html',
  styleUrls: ['./documento-create.component.scss'],
  providers: [ FormioResourceService,
              // AppResourceConfig,
              {provide: FormioResourceConfig,
                  // useClass: AppResourceConfig 
                useValue: {
                name: 'vtvform',
                form: 'vtvform'}
              
            }]
          })
      // useFactory: () => new AppResourceConfig()
     

export class DocumentoCreateComponent implements OnInit {

  tipoDocumento: any;
  errorMessage: any;
  formUrl: any;
  public uploader: FileUploader = new FileUploader({url: URL});

  constructor(public service: FormioResourceService,
              public config: FormioResourceConfig,
              // public configOtro: AppResourceConfig,
              public router: Router,
              public location: Location,
              public route: ActivatedRoute,
              public documentoService: DocumentoService) 
              {
    // super(service, route, router, config);
    
    // For manual upload
    // this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    // https://github.com/valor-software/ng2-file-upload/issues/26
  }

  ngOnInit() {
    
    // super.ngOnInit();
    // this.service.formLoaded.then((form) => {
    //   this.config.form = 'nuevoForm';
    //   this.service.loadResource(this.route);
    //   this.service.refresh.emit({
    //         property: 'submission',
    //         value: this.service.resource
    //       });
    //     })
    // this.formUrl = 'http://localhost:3001/vtv';
    this.getTipoDocumentoById();
    this.getForm();
        // Ejemplo para customizar el inicio del form
        // Wait for the parent event to be loaded.
        // this.service.resources['event'].resourceLoaded.then((event) => {

        //   // Wait for the participant form to load.
        //   this.service.formLoaded.then((form) => {
    
            // If they wish to have a custom registration form.
            // if (event.data.registrationForm) {
            //   const registerForm = FormioUtils.getComponent(form.components, 'registration', true);
            //   registerForm.src = this.service.formFormio.projectUrl + '/' + event.data.registrationForm;
            // }
    
            // Wait for the current user to be loaded.
            // this.auth.userReady.then((user) => {
    
            //   // Default the user data inside of the registration form.
            //   this.service.resource.data.registration = {data: user.data};
    
            //   // Tell our form to re-render the submission.
            //   this.service.refresh.emit({
            //     property: 'submission',
            //     value: this.service.resource
            //   });
            // });
        //   });
        // });
  }

  getTipoDocumentoById():void{
    const idTipoDocumento = +this.route.snapshot.paramMap.get('idTipoDocumento');
    this.documentoService.getTipoDocumentoById(idTipoDocumento)
    .subscribe(tipoDocumento => {
      this.tipoDocumento = tipoDocumento;
    }, error => this.errorMessage = <any>error);
  }
 //(submit)="onSubmit($event)"
 //[form]="service.form"
 //src="{{ service.formUrl }}"
  onSubmit(submission: any) {
    console.log('SUBMISSSION!!!!!');
    this.addDocumentoDinamico(submission.data);
  }

  getForm():void{
    this.documentoService.getFormulario()
    .subscribe(config => {
      this.formUrl = `${apiFormUrl}${config.form}`;
      console.log(this.formUrl);
    }, error => this.errorMessage = <any>error);
  }

  // onSubmitt() {
  //   console.log('SUBMISSSION!!!!!');
  //   // this.addDocumentoDinamico(submission.data);
  // }

  addDocumentoDinamico(documento:any):void{
    this.documentoService.addDocumentoDinamico(documento)
      .subscribe(documento => this.errorMessage)
  }

  private cancelar(){
    this.location.back();
  }

  // https://github.com/valor-software/ng2-file-upload/blob/development/src/file-upload/file-uploader.class.ts
  // https://github.com/valor-software/ng2-file-upload/issues/12
  // private prepareUploader(formData) { 
  //   this.uploader.onBuildItemForm = (item, form) => {
  //     for (let key in formData) {
  //       form.append(key, formData[key]);
  //     }
  //   }
  // }

  // createForm() {
  //   this.documentoForm = this.fb.group({
  //     fechaVencimiento: '', // { "year": 2019, "month": 3, "day": 3 }, //  https://ng-bootstrap.github.io/#/components/datepicker/examples
  //     fechaPreaviso:'2020-03-15',
  //   });
  // };
}
