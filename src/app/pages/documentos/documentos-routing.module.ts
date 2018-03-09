import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosComponent } from './documentos.component';
import { DocumentoDetailComponent } from './documento-detail/documento-detail.component';
import { DocumentoViewComponent } from './documento-view/documento-view.component';
import { DocumentoListComponent } from './documento-list/documento-list.component';
import { DocumentoCreateComponent } from './documento-create/documento-create.component';

const routes: Routes = [{
    path: '',
    component: DocumentosComponent,
    children: [{
      path: 'vehiculos',
      component: DocumentoListComponent,
    }, 
    {
      path: 'vehiculos/:idVehiculo',
      component: DocumentoDetailComponent,
    },
    {
      path: 'vehiculos/:idVehiculo/create/:idTipoDocumento',
      component: DocumentoCreateComponent,
    },
    {
      path: ':idDocumento',
      component: DocumentoViewComponent,
    },
    {
      path: 'operadores',
      component: DocumentosComponent,
    }]
  }]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DocumentosRoutingModule { }