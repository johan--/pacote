import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DocumentosService } from '../../../@core/data/documentos.service';

@Component({
  selector: 'documento-modal-tipo-documentos',
  templateUrl: './documento-modal-tipo-documentos.component.html',
//   styleUrls: ['./documento-view.component.scss']
})
export class DocumentoModalTipoDocumentosComponent implements OnInit {


  tipoDocumentos: any;
  modalHeader: string;

  constructor(private activeModal: NgbActiveModal,
    private router: Router,
    private serviceDocumento: DocumentosService) { }

  closeModal() {
    this.activeModal.close();
  }

  selectTipoDocumento(tipoSelected){
    this.router.navigate([
      'pages/documentos/vehiculos/:idVehiculo/create/:idTipoDocumento',{
        idVehiculo:13, 
        idTipoDocumento: tipoSelected.id
      }]);
    
    this.closeModal();
  }

  ngOnInit() {
    this.tipoDocumentos = this.serviceDocumento.getTipoDocumentos();
  }

}