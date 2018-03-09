import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DocumentosRoutingModule } from './documentos-routing.module';

import { SmartTableService } from '../../@core/data/smart-table.service';

import { DocumentosComponent } from './documentos.component';
import { DocumentoDetailComponent } from './documento-detail/documento-detail.component';
import { DocumentoListComponent } from './documento-list/documento-list.component';
import { DocumentoViewComponent } from './documento-view/documento-view.component';
import { DocumentoModalTipoDocumentosComponent } from './documento-detail/documento-modal-tipo-documentos.component';
import { DocumentoCreateComponent } from './documento-create/documento-create.component';
import { FileUploadModule } from 'ng2-file-upload';

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
    FileUploadModule
  ],
  declarations: [
    ...components,
  ],
  providers: [
    SmartTableService,
  ],
  entryComponents: [
    DocumentoModalTipoDocumentosComponent,
  ],
})
export class DocumentosModule { }
