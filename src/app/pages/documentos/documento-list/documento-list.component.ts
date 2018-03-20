import { Component, OnInit } from '@angular/core';

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

export class DocumentoListComponent implements OnInit{

  vehiculos: IEntidad[];
  errorMessage: any;

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

}
