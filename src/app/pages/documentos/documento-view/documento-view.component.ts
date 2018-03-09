import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DocumentoService } from '../../../services/documento.service';
import { IDocumento } from '../../../interfaces/IDocumento';

@Component({
  selector: 'documento-view',
  templateUrl: './documento-view.component.html',
  styleUrls: ['./documento-view.component.scss']
})
export class DocumentoViewComponent implements OnInit {

  documentoForm: FormGroup;
  documento: IDocumento;
  errorMessage: any;

  constructor(private location: Location,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private documentoService: DocumentoService) { 
  }
    
  ngOnInit() {
    this.getDocumentoById();
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

  getDocumentoById():void{
    const idDocumento = +this.route.snapshot.paramMap.get('idDocumento');
    this.documentoService.getDocumentoById(idDocumento)
    .subscribe(documento => {
      this.documento = documento;
      this.createForm(this.documento);
    }, error => this.errorMessage = <any>error);
  }

  private onSubmit() {
    console.log('Submit del form');
  };

}
