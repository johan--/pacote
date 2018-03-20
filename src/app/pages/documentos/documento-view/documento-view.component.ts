import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  FormioResourceCreateComponent,
  FormioResourceService,
  FormioResourceConfig
} from 'angular-formio/resource';

import { DocumentoService } from '../../../services/documento.service';
import { IDocumento } from '../../../interfaces/IDocumento';

@Component({
  selector: 'documento-view',
  templateUrl: './documento-view.component.html',
  styleUrls: ['./documento-view.component.scss']
})
export class DocumentoViewComponent extends FormioResourceCreateComponent implements OnInit {

  documentoForm: FormGroup;
  documento: IDocumento;
  documentoData: any;
  errorMessage: any;

  constructor(private location: Location,
              private fb: FormBuilder,
              private documentoService: DocumentoService,
              public route: ActivatedRoute,
              public router: Router,
              public formioService: FormioResourceService,
              public formioConfig: FormioResourceConfig,) { 
      super(formioService, route, router, formioConfig);
  }
    
  ngOnInit() {
    this.getDocumentoDinamicoById();
  }

  goBack(): void {
    this.location.back();
  }

  createForm(documento?: IDocumento) {
    this.documentoForm = this.fb.group({
      fechaVencimiento: documento.fechaVencimiento, //this.fb.control('', Validators.required); // '2018-03-15', //  https://ng-bootstrap.github.io/#/components/datepicker/examples
      fechaPreaviso:documento.fechaPreaviso,
    });
  };

  initForm(documento?: IDocumento){
    (<FormGroup>this.documentoForm)
      .setValue(this.documento, { onlySelf: true });
  }

  getDocumentoDinamicoById():void{
    const idDocumento = +this.route.snapshot.paramMap.get('idDocumento');
    this.documentoService.getDocumentoDinamicoById(idDocumento)
    .subscribe(documento => {
      this.documentoData = { data: documento };
    }, error => this.errorMessage = <any>error);
  }


  onSubmit() {
    console.log('Submit del form');
  };

}
