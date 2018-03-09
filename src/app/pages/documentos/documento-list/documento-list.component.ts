import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';

import { DocumentoService } from '../../../services/documento.service';
import { IEntidad } from '../../../interfaces/IEntidad';

@Component({
  selector: 'documentos-list',
  templateUrl: './documento-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
  styleUrls: ['./documento-list.component.scss']
})
// export class DocumentosComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


export class DocumentoListComponent implements OnInit{

  vehiculos: IEntidad[];
  errorMessage: any;

  settings = {
    hideSubHeader: true,
    actions: null,
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      link: {
        title: 'Vehiculo',
        type: 'html',
        filter: false,
      },
      funcion: {
        title: 'Función',
        type: 'string',
        filter: false
      },
      documentos: {
        title: 'Documentos',
        type: 'string',
        filter: false
      },
      status: {
        title: 'Status',
        type: 'boolean',
        filter: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private documentoService: DocumentoService) {}

  ngOnInit() {
    this.getDocumentosVehiculos();
  }

  getDocumentosVehiculos():void {
    this.documentoService.getDocumentosVehiculos()
    .subscribe(vehiculos => {
      this.vehiculos = vehiculos;
    }, error => this.errorMessage = <any>error);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
