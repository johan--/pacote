import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PickerModalService } from '../../../services/funcion-picker-modal.service';

@Component({
  selector: 'modal-select-documento',
  templateUrl: './modal-select-documento.component.html',
})
export class ModalSelectTipoDocumentoComponent {

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
    this.pickerModalService.confirmSelectionTipoDocumento(elemSelected);
    this.closeModal(elemSelected);
    
  }

}