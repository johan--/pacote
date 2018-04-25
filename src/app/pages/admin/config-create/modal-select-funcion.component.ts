import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PickerModalService } from '../../../services/funcion-picker-modal.service';

@Component({
  selector: 'modal-select-funcion',
  templateUrl: './modal-select-funcion.component.html',
})
export class ModalSelectFuncionComponent {

  constructor(private activeModal: NgbActiveModal,
              private pickerModalService: PickerModalService) { 
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

}