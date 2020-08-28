import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudMethodsService } from '../services/crud-methods.service';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Engine } from '../models/engine.model';

@Component({
  selector: 'app-engines',
  templateUrl: './engines.component.html',
  styleUrls: ['./engines.component.scss']
})
export class EnginesComponent implements OnInit {

  myForm: FormGroup;
  basePath = 'engines';
  engine: Engine[];
  dados: any;
  $key: string;

  submitted = false;

  constructor(private fb: FormBuilder, private crudService: CrudMethodsService, public toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('מכונה רשומה!');
  }

  showError() {
    this.toastr.error('משהו השתבש. אנא נסה שוב...');
  }
  showDel() {
    this.toastr.success('המכונה נמחקה!');
  }

  ngOnInit() {
    const today: Date = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {dd = 0 + dd; }
    if (mm < 10) {mm = 0 + mm; }
    const hoje = dd + '/' + mm + '/' + yyyy;

    this.myForm = this.fb.group({
      engineName: this.fb.control(''),
      engineNumber: this.fb.control(''),
      engineType: this.fb.control(''),
      engineDate: this.fb.control(hoje)
    });

    this.getEngines();
  }

  getEngines() {
    this.dados = this.crudService.getItems(this.basePath).subscribe(dado => {
      this.engine = dado.map(e => {
        const eng = e.payload.doc.data() as Engine;
        eng.key = e.payload.doc.id;
        return eng;
      });
    });
  }

  saveEngine() {

    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.crudService.createItem(this.basePath, {
      name: this.myForm.value.engineName,
      code: this.myForm.value.engineCode,
      type: this.myForm.value.engineType,
      creationDate: this.myForm.value.engineDate
    }).then(() => {
      this.resetForm();
      this.showSuccess();
    }).catch((err) => {
      this.showError();
      console.log(err);
    });
  }

  delEngine(code, key) {
    if (confirm('האם אתה בטוח שברצונך למחוק ' + code + '?')) {
      this.crudService.deleteItem(this.basePath, key)
      .then(() => {
        this.showDel();
      }).catch((err) => {
        this.showError();
        console.log(err);
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.myForm.controls.engineName.setValue('');
    this.myForm.controls.engineCode.setValue('');
    this.myForm.controls.engineType.setValue('');
  }

}
