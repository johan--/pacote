import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PickerModalService } from '../../../services/funcion-picker-modal.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'modal-select-funcion',
  templateUrl: './modal-select-funcion.component.html',
})
export class ModalSelectFuncionComponent {

  nuevaFuncion:String = "";
  errorMessage: any;

  constructor(private activeModal: NgbActiveModal,
              private pickerModalService: PickerModalService,
              private adminService: AdminService) { 
    }

  closeModal(result:any) {
    this.activeModal.close(result);
  }

  dismissModal(){
    this.activeModal.dismiss();
  }

  selectElement(elemSelected){
    this.pickerModalService.confirmSelectionFuncion(elemSelected);
    this.closeModal(elemSelected); 
  }

  
  keyDownFunction(event, idEmpresa, idEntidad) {
    if(event.keyCode == 13) {
        if (this.nuevaFuncion != ""){
            var funcion = {
                nombre: this.nuevaFuncion,
                empresaId: idEmpresa,
                entidadId: idEntidad
            }
            this.adminService.addFuncion(funcion)
            .subscribe(funcion => {
                return this.selectElement(funcion);
            }, error => this.errorMessage = <any>error);
        }
    }
  }
  

}