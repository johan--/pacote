import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from '../../services/admin.service';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { AdminComponent } from './admin.component';
import { ConfigCreateComponent } from './config-create/config-create.component';
import { ModalSelectDocumentoComponent } from './config-create/modal-select-documento.component';

const components = [
    AdminComponent,
    HomeComponent,
    ConfigComponent,
    ConfigCreateComponent,
    ModalSelectDocumentoComponent
];

@NgModule({
    imports: [
      ThemeModule,
      AdminRoutingModule
    ],
    declarations: [
      ...components,
    ],
    providers: [
        AdminService,
    ],
    entryComponents: [
      ModalSelectDocumentoComponent,
  ],

  })
  export class AdminModule { }