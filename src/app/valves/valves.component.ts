import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudMethodsService } from '../services/crud-methods.service';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Valves } from '../models/valves.model';

@Component({
  selector: 'app-valves',
  templateUrl: './valves.component.html',
  styleUrls: ['./valves.component.scss']
})
export class ValvesComponent implements OnInit {

  myForm: FormGroup;
  basePath = 'valves';
  valves: Valves[];
  dados: any;
  $key: string;

  submitted = false;

  constructor(private fb: FormBuilder, private crudService: CrudMethodsService, public toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('שסתום רשום!');
  }

  showError() {
    this.toastr.error('משהו השתבש. אנא נסה שוב...');
  }
  showDel() {
    this.toastr.success('השסתום נמחק!');
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
      valveCode: this.fb.control(''),
      valveTo: this.fb.control(''),
      valveDate: this.fb.control(hoje)
    });

    this.getValves();
  }

  getValves() {
    this.dados = this.crudService.getItems(this.basePath).subscribe(dado => {
      this.valves = dado.map(e => {
        const valv = e.payload.doc.data() as Valves;
        valv.key = e.payload.doc.id;
        return valv;
      });
    });
  }


  saveValve() {

    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    this.crudService.createItem(this.basePath, {
      code: this.myForm.value.valveCode,
      to: this.myForm.value.valveTo,
      creationDate: this.myForm.value.valveDate
    }).then(() => {
      this.resetForm();
      this.showSuccess();
    }).catch((err) => {
      this.showError();
      console.log(err);
    });
  }

  delValve(code, key) {
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
    this.myForm.controls.valveCode.setValue('');
    this.myForm.controls.valveTo.setValue('');
  }

}
