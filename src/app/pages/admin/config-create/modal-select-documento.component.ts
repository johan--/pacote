import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoService } from '../../../services/documento.service';

@Component({
  selector: 'modal-select-documento',
  templateUrl: './modal-select-documento.component.html',
})
export class ModalSelectDocumentoComponent implements OnInit {


  tipoDocumentos: any;
  modalHeader: string;
  errorMessage: any;
  

  constructor(private activeModal: NgbActiveModal,
    private router: Router,
    private documentoService: DocumentoService) { }

  closeModal(result:any) {
    this.activeModal.close(result);
  }

  dismissModal(){
    this.activeModal.dismiss();

  }
  selectTipoDocumento(tipoSelected){
    this.closeModal(tipoSelected);
  }

  ngOnInit() {
    this.getTiposDocumentos();
  }

  getTiposDocumentos():void{
    this.documentoService.getTiposDocumentos()
    .subscribe(tiposDocumentos => {
      this.tipoDocumentos = tiposDocumentos;
    }, error => this.errorMessage = <any>error);
  }
}