import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Route } from '@angular/router/src/config';

import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  empresa: any;
  configuraciones: any[];
  errorMessage: any;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.configuraciones = [];
    this.getEmpresaById();
  }


  getEmpresaById():void{
    const idEmpresa = +this.route.snapshot.paramMap.get('idEmpresa');
    this.adminService.getEmpresaById(idEmpresa)
    .subscribe(empresa => {
      this.empresa = empresa;
    }, error => this.errorMessage = <any>error);
  }


}
