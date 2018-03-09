import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
 
const URL = 'create';

@Component({
  selector: 'documento-create',
  templateUrl: './documento-create.component.html',
  styleUrls: ['./documento-create.component.scss']
})
export class DocumentoCreateComponent implements OnInit {

  documentoForm: FormGroup;
  public uploader: FileUploader = new FileUploader({url: URL});

  constructor(private location: Location,
              private fb: FormBuilder) {
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("Status",status); // https://github.com/valor-software/ng2-file-upload/issues/26
  };
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.documentoForm = this.fb.group({
      fechaVencimiento: '', // { "year": 2019, "month": 3, "day": 3 }, //  https://ng-bootstrap.github.io/#/components/datepicker/examples
      fechaPreaviso:'2020-03-15',
    });
  };

  private onSubmit() {
    this.prepareUploader(this.documentoForm.value);
    this.uploader.uploadAll();
  };

  private cancelar(){
    this.location.back();
  }

  // https://github.com/valor-software/ng2-file-upload/blob/development/src/file-upload/file-uploader.class.ts
  private prepareUploader(formData) { //https://github.com/valor-software/ng2-file-upload/issues/12
    this.uploader.onBuildItemForm = (item, form) => {
      for (let key in formData) {
        form.append(key, formData[key]);
      }
    }
  }
}
