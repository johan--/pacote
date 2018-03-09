import { Component, OnInit } from '@angular/core';

import { DocumentoService } from '../../services/documento.service';
import { IDocumento } from '../../interfaces/IDocumento'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  documentos: IDocumento[];
  errorMessage: any;
  
  constructor(private documentoService: DocumentoService) { }

  ngOnInit() {
    this.getDocumentos();
  }

  getDocumentos(): void {
    this.documentoService.getDocumentos()
        .subscribe(documentos => {
            this.documentos = documentos;
        }, error => this.errorMessage = <any>error);
  }

}
