import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { ConfigCreateComponent } from './config-create/config-create.component';

const routes: Routes = [{
    path: '',
    component: AdminComponent,
    children: [
        {
            path: 'config/empresas',
            component: HomeComponent},
        {
            path: 'config/empresas/:idEmpresa',
            component: ConfigComponent},
        {
            path: 'config/empresas/:idEmpresa/create',
            component: ConfigCreateComponent},
        {
            path: '',
            redirectTo: 'config/empresas',
            pathMatch: 'full',
        }]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

  export class AdminRoutingModule { }