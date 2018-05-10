import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Route } from '@angular/router/src/config';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../services/admin.service';
import { PickerModalService } from '../../../services/funcion-picker-modal.service';
import { ModalSelectTipoDocumentoComponent } from '../config-create/modal-select-documento.component';
import { ModalSelectFuncionComponent } from '../config-create/modal-select-funcion.component';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})

    
export class ConfigComponent implements OnInit {
    // Harcoded ids for entidades
    entidadVehiculoId: number = 1;
    entidadOperadorId: number = 2;

    // Variables para contener las configuraciones de cada
    // funcion con sus tipos de documentos (segun la empresa)
    configOperadores: any[] = [];
    configVehiculos: any[] = [];

    // Variable de ayuda para indicar temporalmente sobre que 
    // funcion se esta trabajando. Necesaria para interactuar con
    // los modals al seleccionar un tipo de documento a agregar
    // a la configuracion de la funcion
    activeSelectedFuncion:any;

    empresa: any;
    errorMessage: any;
    


    constructor(private adminService: AdminService,
        private funcionPickerModalService: PickerModalService,
        private tipoDocumentoPickerModalService: PickerModalService,
        private route: ActivatedRoute,
        private location: Location,
        private modalService: NgbModal) {


        funcionPickerModalService.confirmedSelectionFuncion$.subscribe(
            funcion => {
                this.closeModalFuncionListener(funcion);
            },
            error => {
                console.log('error');
            }
        );

        tipoDocumentoPickerModalService.confirmedSelectionTipoDocumento$.subscribe(
            tipoDocumento => {
                this.closeModalTipoDocumentoListener(tipoDocumento);
            },
            error => {
                console.log('error');
            }
        );
    }

    ngOnInit() {
        this.configOperadores = [];
        this.getEmpresaById();
        this.getConfiguracionesByEntidad(this.entidadOperadorId);
        this.getConfiguracionesByEntidad(this.entidadVehiculoId);
    }

    getConfiguracionesByEntidad(entidadId){
        const idEmpresa = +this.route.snapshot.paramMap.get('idEmpresa');
        this.adminService.getFuncionesByEmpresaEntidad(idEmpresa, entidadId)
            .subscribe(configuracionEntidad => {
                var confValidas = [];
                // Quitamos aquellas funciones de las configuraciones que 
                // aun no tienen asociado/vinculado tipos de documentos 
                for (var i in configuracionEntidad) {
                    if (configuracionEntidad[i].configuracion.length > 0){
                        confValidas.push(configuracionEntidad[i]);
                    }
                }
                switch (entidadId) {
                    case this.entidadVehiculoId:
                      this.configVehiculos = confValidas;
                      break;
                    case this.entidadOperadorId:
                      this.configOperadores = confValidas;
                      break;
                    // Agregar futuras entidades
                  }
               
            }, error => this.errorMessage = <any>error);
    }


    /**
     * Permite abrir un Modal para seleccionar una funcion. Las funciones
     * que muestra el modal son prefiltradas previamente segun el parametro
     * idEntidad. Este valor viene ´hardcodeado´ desde el template.
     * 
     * 
     * @param idEntidad - Identificador para filtrar las funciones
     */
    openModalFunciones(idEntidad: number) {
        const idEmpresa = this.empresa.id;
        this.adminService.getFuncionesByEntidadEmpresa(idEntidad, idEmpresa)
            .subscribe(funciones => {
                // Una vez filtradas las funciones abrimos el modal
                const activeModal = this.modalService
                    .open(ModalSelectFuncionComponent,{ size: 'sm', container: 'nb-layout' });
                activeModal.componentInstance.elementos = funciones;
                activeModal.componentInstance.idEmpresa = this.empresa.id;
                activeModal.componentInstance.idEntidad = idEntidad;
            }, error => this.errorMessage = <any>error);
    }

    closeModalFuncionListener(funcionSeleccionada){
        funcionSeleccionada.configuracion = [];
        switch (funcionSeleccionada.entidadId) {
            case this.entidadVehiculoId:
                this.configVehiculos.unshift(funcionSeleccionada);
                break;
            case this.entidadOperadorId:
                this.configOperadores.unshift(funcionSeleccionada);
                break;
            // Agregar futuras entidades
          }
    }

    openModalTipoDocumento(funcion: any) {
        this.activeSelectedFuncion = funcion;
        console.log(funcion);
        const idEmpresa = this.empresa.id;
        this.adminService.getTiposDocumentosByEmpresa(idEmpresa)
            .subscribe(tiposDocumentos => {
                // Una vez filtradas las funciones abrimos el modal
                console.log(tiposDocumentos);
                const activeModal = this.modalService
                    .open(ModalSelectTipoDocumentoComponent,{ size: 'sm', container: 'nb-layout' });
                activeModal.componentInstance.elementos = tiposDocumentos;
            }, error => this.errorMessage = <any>error);
    }


    closeModalTipoDocumentoListener(tipoDocumentoSeleccionado){
        console.log(tipoDocumentoSeleccionado);
        var newConfig = {
                empresaId: this.empresa.id,
                funcionId: this.activeSelectedFuncion.id,
                tipoDocumentoId: tipoDocumentoSeleccionado.id,
                docRequerido: true,
                docTieneVencimiento: true,
                orden: 1,
                tipoDocumento: tipoDocumentoSeleccionado
                }
        this.guardarConfiguracion(newConfig);
    }

    guardarConfiguracion(configuracion){
        this.adminService.addConfiguracion(configuracion)
            .subscribe(configuracionNueva => {
                // El guardado por defecto no retorna el tipo de documento 
                // embebido a la configuracion, por eso lo agregamos manualmente
                configuracionNueva.tipoDocumento = configuracion.tipoDocumento;
                this.activeSelectedFuncion.configuracion.unshift(configuracionNueva);        
            }, error => this.errorMessage = <any>error);
    }

    /**
     * Metodo vinculado al evento `change` del input que indica para
     * cada tipo de documento si es un documento que tendra vencimiento
     * o no. Cuando se tilda desde la interface, se actualiza y persiste
     * el cambio inmediatamente.
     * Obs: Si falla la actualizacion no se realiza por el momento ningun
     * control. Es decir que el usuario seguira visualizando el cambio en la 
     * interface aunque el mismo no se haya realizado en forma persistente.
     * @param configuracion - configuracion que esta siendo modificada
     */
    changeDocTieneVencimiento(configuracion){
        configuracion.docTieneVencimiento = !configuracion.docTieneVencimiento;
        this.actualizarConfiguracion(configuracion);
    }

    changeDocEsRequerido(configuracion){
        configuracion.docRequerido = !configuracion.docRequerido;
        this.actualizarConfiguracion(configuracion);
    }

    /**
     * Persiste los cambios realizados en el objeto configuracion recibido
     * por parametro. 
     * 
     * @param configuracion - configuracion que se va a actualizar
     */
    actualizarConfiguracion(configuracion){
        this.adminService.updateConfiguracion(configuracion)
            .subscribe(configuracionActualizada => {      
            }, error => this.errorMessage = <any>error);
    }

    eliminarConfiguracion(configEntidad, configuracion, index){
        this.adminService.deleteConfiguracion(configuracion.id)
            .subscribe(result => {
                if (result.count == 1){
                    configEntidad.configuracion.splice(index, 1);    
                }      
            }, error => this.errorMessage = <any>error);
    }

    eliminarConfiguracionEntidad(configEntidad, configuracion, index){
        this.adminService.deleteConfiguracionEntidad(configuracion.id)
            .subscribe(result => {
                if (result.count == 1){
                    configEntidad.splice(index, 1);    
                }      
            }, error => this.errorMessage = <any>error);
    }

    getEmpresaById(): void {
        const idEmpresa = +this.route.snapshot.paramMap.get('idEmpresa');
        this.adminService.getEmpresaById(idEmpresa)
            .subscribe(empresa => {
                this.empresa = empresa;
            }, error => this.errorMessage = <any>error);
    }

}
