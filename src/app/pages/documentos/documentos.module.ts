import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosComponent } from './documentos.component';
import { DocumentoDetailComponent } from './documento-detail/documento-detail.component';
import { DocumentoListComponent } from './documento-list/documento-list.component';
import { DocumentoViewComponent } from './documento-view/documento-view.component';
import { DocumentoModalTipoDocumentosComponent } from './documento-detail/documento-modal-tipo-documentos.component';
import { DocumentoCreateComponent } from './documento-create/documento-create.component';

import { FileUploadModule } from 'ng2-file-upload';

import { FormioModule, FormioAppConfig } from 'angular-formio';
import { FormioResources } from 'angular-formio/resource';
import { AppConfig } from '../../../../formio.config';


import {
  FormioResource,
  FormioResourceRoutes,
  FormioResourceConfig,
  FormioResourceService
} from 'angular-formio/resource';

const components = [
    DocumentosComponent,
    DocumentoDetailComponent,
    DocumentoListComponent,
    DocumentoViewComponent,
    DocumentoCreateComponent,
    DocumentoModalTipoDocumentosComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    DocumentosRoutingModule,
    Ng2SmartTableModule,
    FileUploadModule,
    ReactiveFormsModule, 
    FormioModule,
    FormioResource
  ],
  declarations: [
    ...components,
  ],
  providers: [
    SmartTableService,
    FormioResources,
    {provide: FormioAppConfig, useValue: AppConfig},
    FormioResourceService,
      {
        provide: FormioResourceConfig,
        useValue: {
          name: 'vtv',
          form: 'vtv',
          // parents: ['event']
        }
      }
  ],
  entryComponents: [
    DocumentoModalTipoDocumentosComponent,
  ],
})
export class DocumentosModule { }
