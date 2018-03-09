import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoService } from '../../../services/documento.service';
import { DocumentoModalTipoDocumentosComponent } from './documento-modal-tipo-documentos.component';
import { Route } from '@angular/router/src/config';
import { IDocumento } from '../../../interfaces/IDocumento';
import { IEntidad } from '../../../interfaces/IEntidad';

@Component({
  selector: 'documento-detail',
  templateUrl: './documento-detail.component.html',
  styleUrls: ['./documento-detail.component.scss']
})
export class DocumentoDetailComponent implements OnInit {

  entidad: IEntidad;
  documentos: IDocumento[];
  errorMessage: any;

  constructor(private documentoService: DocumentoService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private location: Location) {
  }

  ngOnInit() {
    this.getEntidadById();
    this.getDocumentosByEntidad();
  }

  getDocumentosByEntidad():void {
    const idEntidad = +this.route.snapshot.paramMap.get('idVehiculo');
    this.documentoService.getDocumentosByEntidad(idEntidad)
    .subscribe(documentos => {
      this.documentos = documentos;
    }, error => this.errorMessage = <any>error);
  }

  getEntidadById():void{
    const idEntidad = +this.route.snapshot.paramMap.get('idVehiculo');
    this.documentoService.getEntidadById(idEntidad)
    .subscribe(entidad => {
      this.entidad = entidad;
    }, error => this.errorMessage = <any>error);
  }

  goBack(): void {
    this.location.back();
  }

  editDocumento(idDocumento){
    this.router.navigate(['pages/documentos', idDocumento]);
  }

  showSmallModal() {
    const activeModal = this.modalService.open(
      DocumentoModalTipoDocumentosComponent, { size: 'sm', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Indique el tipo de documento a crear';
  }

  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

  // onCustom(event) {
  //   if (event.action === 'view'){
  //     let documentoId = event.data.id;
  //     this.router.navigate(['pages/documentos', documentoId]);
  //   }
  // }
}
