import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'modal-select-funcion',
  templateUrl: './modal-select-funcion.component.html',
})
export class ModalSelectFuncionComponent implements OnInit {


  listaSeleccion: any;
  modalHeader: string;
  errorMessage: any;
  

  constructor(private activeModal: NgbActiveModal,
    private router: Router,
    private adminService: AdminService) { }

  closeModal(result:any) {
    this.activeModal.close(result);
  }

  dismissModal(){
    this.activeModal.dismiss();

  }
  selectElement(elemSelected){
    this.closeModal(elemSelected);
  }

  ngOnInit() {
    this.getFunciones();
  }

  getFunciones():void{
    this.adminService.getFunciones()
    .subscribe(funciones => {
      this.listaSeleccion = funciones;
    }, error => this.errorMessage = <any>error);
  }
}