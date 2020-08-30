import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CrudMethodsService } from '../services/crud-methods.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Qa } from '../models/qa.model';
import { Engine } from '../models/engine.model';
import { Valves } from '../models/valves.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-qa-reports',
  templateUrl: './qa-reports.component.html',
  styleUrls: ['./qa-reports.component.scss']
})
export class QaReportsComponent implements OnInit {

  qaForm: FormGroup;

  basePath = 'qareports';
  basePath2 = 'engines';
  basePath3 = 'valves';
  baseUser = 'users';
  qa: Qa[];
  engines: Engine[];
  valves: Valves[];
  cUser: any;
  dados: any;
  dados2: any;
  $key: string;

  userId: string;
  userName: string;

  dataUser: any;

  submitted = false;
  engtype;
  engfields;

  constructor(private fb: FormBuilder, private crudService: CrudMethodsService,
              public toastr: ToastrService, public authService: AuthService,
              private afAuth: AngularFireAuth) {}


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
    today.toISOString().substr(11, 8);
    const month = today.getMonth() + 1;
    const dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
    const mm = (month < 10 ? '0' : '') + month;

    // const hr = (today.getHours() < 10 ? '0' : '') + today.getHours();
    // const min = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

    const yyyy = today.getFullYear();

    const hoje = dd + '/' + mm + '/' + yyyy;
    // const hora = hr + ':' + min;

    const ok = 'OK';

    this.qaForm = this.fb.group({
      qaEngine: this.fb.control(''),
      engSubtype: this.fb.control(''),
      manaCode: this.fb.control(''),
      valveCode: this.fb.control(''),
      qaDate: this.fb.control(hoje),
      qaTime: this.fb.control(''),
      createdBy: this.fb.control(''),
      result: this.fb.control(''),
      stretchMarks: this.fb.control(ok),
      defects: this.fb.control(ok),
      remarks: this.fb.control(''),
      location: this.fb.control(ok),
      compatible: this.fb.control(ok),
      readable: this.fb.control(ok),
      speck: this.fb.control(ok),
      tightening: this.fb.control(ok),
      facility: this.fb.control(ok),
      retrieval: this.fb.control(ok),
      spring: this.fb.control(ok)
    });

    this.authService.user$.subscribe(user => {
        this.userName = user.name;
        this.qaForm.get('createdBy').setValue(this.userName);

      });

    this.getEngines();
    this.getValves();
  }

  getEngines() {
    this.dados = this.crudService.getItems(this.basePath2).subscribe(dado => {
      this.engines = dado.map(e => {
        const eng = e.payload.doc.data() as Engine;
        eng.key = e.payload.doc.id;
        return eng;
      });
    });
  }

  getValves() {
    this.dados2 = this.crudService.getItems(this.basePath3).subscribe(dado => {
      this.valves = dado.map(e => {
        const valv = e.payload.doc.data() as Valves;
        valv.key = e.payload.doc.id;
        return valv;
      });
    });
  }

  onEngineChange() {
    const enginer: Engine = this.qaForm.controls.qaEngine.value;
    this.engtype = enginer.type;

    if (this.engtype === 'type1') {
      this.engfields = 1;
    }
    if (this.engtype === 'type2') {
      this.engfields = 2;
    }
    if (this.engtype === 'type3') {
      this.engfields = 3;
    }
    if (this.engtype === 'type4') {
      this.engfields = 4;
    }
    if (this.engtype === 'type5') {
      this.engfields = 5;
    }
 }

  saveQA1() {

    this.submitted = true;

    if (this.qaForm.invalid) {
      return;
    }
    const cDate: Date = new Date();
    cDate.toISOString().substr(11, 8);
    const hr = (cDate.getHours() < 10 ? '0' : '') + cDate.getHours();
    const min = (cDate.getMinutes() < 10 ? '0' : '') + cDate.getMinutes();

    const hora = hr + ':' + min;

    this.crudService.createItem(this.basePath, {
      engine: this.qaForm.value.qaEngine.code,
      engType: this.qaForm.value.qaEngine.type,
      engSubtype: this.qaForm.value.engSubtype,
      manaCode: this.qaForm.value.manaCode,
      creationDate: this.qaForm.value.qaDate,
      creationTime: hora,
      createdBy: this.qaForm.value.createdBy,
      valveCode: this.qaForm.value.valveCode.code,
      valveDesc: this.qaForm.value.valveCode.description,
      result: this.qaForm.value.result,
      stretchMarks: this.qaForm.value.stretchMarks,
      defects: this.qaForm.value.defects,
      remarks: this.qaForm.value.remarks
    }).then(() => {
      this.resetForm();
      this.showSuccess();
    }).catch((err) => {
      this.showError();
      console.log(err);
    });
  }

  saveQA2() {

    this.submitted = true;

    if (this.qaForm.invalid) {
      return;
    }
    const cDate: Date = new Date();
    cDate.toISOString().substr(11, 8);
    const hr = (cDate.getHours() < 10 ? '0' : '') + cDate.getHours();
    const min = (cDate.getMinutes() < 10 ? '0' : '') + cDate.getMinutes();

    const hora = hr + ':' + min;

    this.crudService.createItem(this.basePath, {
      engine: this.qaForm.value.qaEngine.code,
      engType: this.qaForm.value.qaEngine.type,
      manaCode: this.qaForm.value.manaCode,
      creationDate: this.qaForm.value.qaDate,
      creationTime: hora,
      createdBy: this.qaForm.value.createdBy,
      valveCode: this.qaForm.value.valveCode.code,
      valveDesc: this.qaForm.value.valveCode.description,
      location: this.qaForm.value.location,
      compatible: this.qaForm.value.compatible,
      readable: this.qaForm.value.readable
    }).then(() => {
      this.resetForm();
      this.showSuccess();
    }).catch((err) => {
      this.showError();
      console.log(err);
    });
  }

  saveQA3() {

    this.submitted = true;

    if (this.qaForm.invalid) {
      return;
    }
    const cDate: Date = new Date();
    cDate.toISOString().substr(11, 8);
    const hr = (cDate.getHours() < 10 ? '0' : '') + cDate.getHours();
    const min = (cDate.getMinutes() < 10 ? '0' : '') + cDate.getMinutes();

    const hora = hr + ':' + min;

    this.crudService.createItem(this.basePath, {
      engine: this.qaForm.value.qaEngine.code,
      engType: this.qaForm.value.qaEngine.type,
      creationDate: this.qaForm.value.qaDate,
      creationTime: hora,
      createdBy: this.qaForm.value.createdBy,
      result: this.qaForm.value.result,
      stretchMarks: this.qaForm.value.stretchMarks,
      defects: this.qaForm.value.defects,
      remarks: this.qaForm.value.remarks
    }).then(() => {
      this.resetForm();
      this.showSuccess();
    }).catch((err) => {
      this.showError();
      console.log(err);
    });
  }

  saveQA4() {

    this.submitted = true;

    if (this.qaForm.invalid) {
      return;
    }
    const cDate: Date = new Date();
    cDate.toISOString().substr(11, 8);
    const hr = (cDate.getHours() < 10 ? '0' : '') + cDate.getHours();
    const min = (cDate.getMinutes() < 10 ? '0' : '') + cDate.getMinutes();

    const hora = hr + ':' + min;

    this.crudService.createItem(this.basePath, {
      engine: this.qaForm.value.qaEngine.code,
      engType: this.qaForm.value.qaEngine.type,
      manaCode: this.qaForm.value.manaCode,
      creationDate: this.qaForm.value.qaDate,
      creationTime: hora,
      createdBy: this.qaForm.value.createdBy,
      valveCode: this.qaForm.value.valveCode.code,
      valveDesc: this.qaForm.value.valveCode.description,
      speck: this.qaForm.value.speck,
      tightening: this.qaForm.value.tightening,
      facility: this.qaForm.value.facility,
      remarks: this.qaForm.value.remarks
    }).then(() => {
      this.resetForm();
      this.showSuccess();
    }).catch((err) => {
      this.showError();
      console.log(err);
    });
  }

  saveQA5() {

    this.submitted = true;

    if (this.qaForm.invalid) {
      return;
    }
    const cDate: Date = new Date();
    cDate.toISOString().substr(11, 8);
    const hr = (cDate.getHours() < 10 ? '0' : '') + cDate.getHours();
    const min = (cDate.getMinutes() < 10 ? '0' : '') + cDate.getMinutes();

    const hora = hr + ':' + min;

    this.crudService.createItem(this.basePath, {
      engine: this.qaForm.value.qaEngine.code,
      engType: this.qaForm.value.qaEngine.type,
      manaCode: this.qaForm.value.manaCode,
      creationDate: this.qaForm.value.qaDate,
      creationTime: hora,
      createdBy: this.qaForm.value.createdBy,
      valveCode: this.qaForm.value.valveCode.code,
      valveDesc: this.qaForm.value.valveCode.description,
      retrieval: this.qaForm.value.retrieval,
      spring: this.qaForm.value.spring,
      defects: this.qaForm.value.defects,
      remarks: this.qaForm.value.remarks
    }).then(() => {
      this.resetForm();
      this.showSuccess();
    }).catch((err) => {
      this.showError();
      console.log(err);
    });
  }

  resetForm() {
    this.submitted = false;
    this.qaForm.controls.qaEngine.setValue('');
    this.qaForm.controls.manaCode.setValue('');
    this.qaForm.controls.valveCode.setValue('');
    this.qaForm.controls.result.setValue('');
    this.qaForm.controls.remarks.setValue('');
  }

}
