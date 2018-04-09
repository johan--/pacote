import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Route } from '@angular/router/src/config';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../services/admin.service';
import { ModalSelectDocumentoComponent } from '../config-create/modal-select-documento.component';
import { ModalSelectFuncionComponent } from '../config-create/modal-select-funcion.component';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  empresa: any;
  configuraciones: any[];
  funciones: any[];
  errorMessage: any;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.configuraciones = [];
    this.getEmpresaById();
    this.getFunciones();
  }

  selectDocumentoModal(funcion:any) {
    const activeModal = this.modalService.open(
      ModalSelectDocumentoComponent, { size: 'sm', container: 'nb-layout' })
        .result.then((result) => {
            if (result != null) {
                var funcionNueva = {
                    tipoDocumento: result.nombre,
                    requerido:true,
                    vencimiento:true
                    }
                funcion.tiposDocumentos.push(funcionNueva);
            // this.addConfiguracion(this.config);
            }
            console.log(result);
        }, (reason) => {
            console.log('Volviendo del form. Reason')
            console.log(reason);
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    // activeModal.componentInstance.modalHeader = 'Seleccione un tipo de documento';
  }

  selectFuncionModal() {
    console.log("FUNCIONES MODAL FUNCTION")
    const activeModal = this.modalService.open(
      ModalSelectFuncionComponent, { size: 'sm', container: 'nb-layout' })
        .result.then((result) => {
            result.tiposDocumentos = [];
            // var nuevaConfig = {

            // }
            this.funciones.unshift(result);
            // if (result != null) {
            //     var funcionNueva = {
            //         tipoDocumento: result.nombre,
            //         requerido:true,
            //         vencimiento:true
            //         }
            //     funcion.tiposDocumentos.push(funcionNueva);
            // this.addConfiguracion(this.config);
            // }
            console.log(result);
        }, (reason) => {
            console.log('Volviendo del form. Reason')
            console.log(reason);
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    // activeModal.componentInstance.modalHeader = 'Seleccione un tipo de documento';
  }


  getEmpresaById():void{
    const idEmpresa = +this.route.snapshot.paramMap.get('idEmpresa');
    this.adminService.getEmpresaById(idEmpresa)
    .subscribe(empresa => {
      this.empresa = empresa;
    }, error => this.errorMessage = <any>error);
  }

  getFunciones():void{
    const idEmpresa = +this.route.snapshot.paramMap.get('idEmpresa');
    this.adminService.getFuncionesByEmpresa(idEmpresa)
    .subscribe(funciones => {
      this.funciones = funciones;
    }, error => this.errorMessage = <any>error);
  }


}
