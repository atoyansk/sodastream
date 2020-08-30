import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudMethodsService } from '../services/crud-methods.service';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';

import { Qa } from '../models/qa.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  basePath = 'qareports';

  reports: Qa[];
  dados: any;

  reports1: Qa[];
  dados1: any;

  reports2: Qa[];
  dados2: any;

  reports3: Qa[];
  dados3: any;

  reports4: Qa[];
  dados4: any;

  reports5: Qa[];
  dados5: any;

  constructor(private crudService: CrudMethodsService) { }

  ngOnInit() {

    this.getQA1a();
    this.getQA1b();
    this.getQA2();
    this.getQA3();
    this.getQA4();
    this.getQA5();
  }

  getQA1a() {
    this.dados = this.crudService.getFilterSort(this.basePath, 'engType', 'type1', 'engSubtype', 'sub1', 'creationTime', 'desc')
    .subscribe(dado => {
      this.reports = dado.map(e => {
        const rep = e.payload.doc.data() as Qa;
        rep.key = e.payload.doc.id;
        return rep;
      });
    });
  }
  getQA1b() {
    this.dados1 = this.crudService.getFilterSort(this.basePath, 'engType', 'type1', 'engSubtype', 'sub2', 'creationTime', 'desc')
    .subscribe(dado => {
      this.reports1 = dado.map(e => {
        const rep1 = e.payload.doc.data() as Qa;
        rep1.key = e.payload.doc.id;
        return rep1;
      });
    });
  }

  getQA2() {
    this.dados2 = this.crudService.getItemSort(this.basePath, 'engType', 'type2', 'creationTime', 'desc').subscribe(dado => {
      this.reports2 = dado.map(e => {
        const rep2 = e.payload.doc.data() as Qa;
        rep2.key = e.payload.doc.id;
        return rep2;
      });
    });
  }

  getQA3() {
    this.dados3 = this.crudService.getItemSort(this.basePath, 'engType', 'type3', 'creationTime', 'desc').subscribe(dado => {
      this.reports3 = dado.map(e => {
        const rep3 = e.payload.doc.data() as Qa;
        rep3.key = e.payload.doc.id;
        return rep3;
      });
    });
  }

  getQA4() {
    this.dados4 = this.crudService.getItemSort(this.basePath, 'engType', 'type4', 'creationTime', 'desc').subscribe(dado => {
      this.reports4 = dado.map(e => {
        const rep4 = e.payload.doc.data() as Qa;
        rep4.key = e.payload.doc.id;
        return rep4;
      });
    });
  }

  getQA5() {
    this.dados5 = this.crudService.getItemSort(this.basePath, 'engType', 'type5', 'creationTime', 'desc').subscribe(dado => {
      this.reports5 = dado.map(e => {
        const rep5 = e.payload.doc.data() as Qa;
        rep5.key = e.payload.doc.id;
        return rep5;
      });
    });
  }

}
