import { Injectable } from '@angular/core';

@Injectable()
export class DocumentosService {
    data = [{
        id: 1,
        vehiculo: 'OYL 339 - Fiat Strada',
        link: '<a href="#/pages/documentos/vehiculos/15">OYL 339 - Fiat Strada</a>',
        funcion: 'Vehiculo',
        documentos: 'VTV, Seguro, Transporte Nqn',
        status: true,
      },
      {
        id: 1,
        vehiculo: 'GPR 223 - Toyota Hilux',
        link: '<a href="#/pages/documentos/vehiculos/14">GPR 223 - Toyota Hilux</a>',
        funcion: 'Camioneta',
        documentos: 'VTV, Transporte Nqn',
        status: false,
      },
      {
        id: 1,
        vehiculo: 'MMC 306- Ford Ranger',
        link: '<a href="#/pages/documentos/vehiculos/13">MMC 306- Ford Ranger</a>',
        funcion: 'Camioneta',
        documentos: 'VTV',
        status: true,
      },
    ]

    documentos = [{
      id: '1',
      tipo_documento: 'VTV',
      metadata: '',
      created: new Date(),
      updated: new Date(),
      file: '',
      filetype : '',
      filetype_icon : '',
      file_thumbnail : 'assets/images/doc.png',
      requerido: true,
      vencido: false,
      status: '',
      archivado: true,
      replaced_by : '',
      entidad: {
          id: '1',
          tipo: 'Vehiculo',
          funcion: 'Camioneta',
          nombre: 'ABC 318. Toyota Hilux',
          url: '',
      },
      fecha_vencimiento: new Date(),
      fecha_preaviso: new Date(),
      },
      {
          id: '2',
          tipo_documento: 'VTV',
          metadata: '',
          created: new Date(),
          updated: new Date(),
          file: '',
          filetype : '',
          filetype_icon : '',
          file_thumbnail : 'assets/images/doc.png',
          requerido: true,
          vencido: false,
          status: '',
          archivado: true,
          replaced_by : '',
          entidad: {
              id: '2',
              tipo: 'Vehiculo',
              funcion: 'Camioneta',
              nombre: 'AAN 348. Toyota Hilux',
              url: '',
          },
          fecha_vencimiento: new Date(),
          fecha_preaviso: new Date(),
      },
      {
          id: '3',
          tipo_documento: 'DNI',
          metadata: '',
          created: new Date(),
          updated: new Date(),
          file: '',
          filetype : '',
          filetype_icon : '',
          file_thumbnail : 'assets/images/doc.png',
          requerido: true,
          vencido: false,
          status: '',
          archivado: true,
          replaced_by : '',
          entidad: {
              id: '1',
              tipo: 'Operador',
              funcion: 'Soldador',
              nombre: 'German Karag',
              url: '',
          },
          fecha_vencimiento: new Date(),
          fecha_preaviso: new Date(),
      },
      {
        id: '4',
        tipo_documento: 'Carnet',
        metadata: '',
        created: new Date(),
        updated: new Date(),
        file: '',
        filetype : '',
        filetype_icon : '',
        file_thumbnail : 'assets/images/doc.png',
        requerido: true,
        vencido: false,
        status: '',
        archivado: true,
        replaced_by : '',
        entidad: {
            id: '1',
            tipo: 'Operador',
            funcion: 'Soldador',
            nombre: 'German Karag',
            url: '',
        },
        fecha_vencimiento: new Date(),
        fecha_preaviso: new Date(),
    },
    {
      id: '5',
      tipo_documento: 'Seguro',
      metadata: '',
      created: new Date(),
      updated: new Date(),
      file: '',
      filetype : '',
      filetype_icon : '',
      file_thumbnail : 'assets/images/doc.png',
      requerido: true,
      vencido: false,
      status: '',
      archivado: true,
      replaced_by : '',
      entidad: {
          id: '3',
          tipo: 'Vehiculo',
          funcion: 'Camioneta',
          nombre: 'KTC 147',
          url: '',
      },
      fecha_vencimiento: new Date(),
      fecha_preaviso: new Date(),
  }
  ]


    dataDetailVehiculo = [{
      id: 1,
      documento: '<a href="#/pages/documentos/vehiculos/15/documento/12">VTV</a>',
      fechaVencimiento: '21/12/2018',
      notificaVencimiento: 'Si',
      obligatorio: 'Si',
      cargado: '<i class="fa fa-check"></i>',
    },
    {
      id: 2,
      documento: '<a href="#/pages/documentos/vehiculos/15/documento/12">Seguro</a>',
      fechaVencimiento: '06/12/2018',
      notificaVencimiento: 'Si',
      obligatorio: 'No',
      cargado: '<i class="fa fa-times"></i>',
    },
    {
      id: 3,
      documento: '<a href="#/pages/documentos/vehiculos/15/documento/12">Transporte Nqn</a>',
      fechaVencimiento: '05/12/2018',
      notificaVencimiento: 'Si',
      obligatorio: 'SI',
      cargado: '<i class="fa fa-check"></i>',
    },
  ]

  dataTipoDocumentos = [
    {
      id:1,
      nombre:'VTV'
    },
    {
      id:2,
      nombre:'Seguro'
    },
    {
      id:3,
      nombre:'Transporte Nqn'
    }
  ]
    
  get() {
    return this.data;
  }

  getByEntidad(){
  }

  getByVehiculo(idPaciente: any){
    return this.dataDetailVehiculo;
  }

  getTipoDocumentos(){
    return this.dataTipoDocumentos;
  }
}