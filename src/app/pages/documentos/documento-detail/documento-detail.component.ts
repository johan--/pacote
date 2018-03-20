import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Route } from '@angular/router/src/config';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentoModalTipoDocumentosComponent } from './documento-modal-tipo-documentos.component';

import { IDocumento } from '../../../interfaces/IDocumento';
import { IEntidad } from '../../../interfaces/IEntidad';
import { DocumentoService } from '../../../services/documento.service';

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
    const idEntidad = +this.route.snapshot.paramMap.get('idEntidad');
    this.documentoService.getDocumentosByEntidad(idEntidad)
    .subscribe(documentos => {
      this.documentos = documentos;
    }, error => this.errorMessage = <any>error);
  }

  getEntidadById():void{
    const idEntidad = +this.route.snapshot.paramMap.get('idEntidad');
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
}
