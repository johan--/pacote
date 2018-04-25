import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PickerModalService {

    private confirmedSelectionFuncion = new Subject<any>();
    confirmedSelectionFuncion$ = this.confirmedSelectionFuncion.asObservable();

    private confirmedSelectionTipoDocumento = new Subject<any>();
    confirmedSelectionTipoDocumento$ = this.confirmedSelectionTipoDocumento.asObservable();

  constructor() {

  }

  confirmSelectionFuncion(selection : any) {
    this.confirmedSelectionFuncion.next(selection);
  }

  confirmSelectionTipoDocumento(selection : any) {
    this.confirmedSelectionTipoDocumento.next(selection);
  }


}