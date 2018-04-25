import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../services/admin.service';
import { ModalSelectTipoDocumentoComponent } from './modal-select-documento.component';

@Component({
  selector: 'config-create',
  templateUrl: './config-create.component.html',
  styleUrls: ['./config-create.component.scss']
})
export class ConfigCreateComponent implements OnInit {
  
  configuraciones: any[];
  config: any;
  errorMessage: any;

  constructor(private adminService: AdminService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getConfiguraciones();
  }

  selectDocumentoModal() {
    const activeModal = this.modalService.open(
      ModalSelectTipoDocumentoComponent, { size: 'sm', container: 'nb-layout' }).result.then((result) => {
        if (result != null) {
          this.config = {
              tipoDocumento: result.nombre,
              requerido:true,
              vencimiento:true
          }
          this.addConfiguracion(this.config);
        }
        console.log(result);
      }, (reason) => {
        console.log('Volviendo del form. Reason')
        console.log(reason);
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    // activeModal.componentInstance.modalHeader = 'Seleccione un tipo de documento';
  }

  getConfiguraciones(){
    this.adminService.getConfiguraciones()
    .subscribe(configuraciones => {
      this.configuraciones = configuraciones;
    }, error => this.errorMessage = <any>error);
  }

  addConfiguracion(configuracion:any):void{
    this.adminService.addConfiguracion(configuracion)
    .subscribe(configuracion => {
      this.configuraciones.push(configuracion);
    }, error => this.errorMessage = <any>error);
  }

}
