import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  empresas: any[];
  errorMessage: any;
  
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getEmpresas();
  }

  getEmpresas(): void {
    this.adminService.getEmpresas()
        .subscribe(empresas => {
            this.empresas = empresas;
        }, error => this.errorMessage = <any>error);
  }

}
