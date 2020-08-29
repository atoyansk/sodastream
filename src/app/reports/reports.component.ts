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

  reports2: Qa[];
  dados2: any;

  constructor(private crudService: CrudMethodsService) { }

  ngOnInit() {

    this.getQA1();
    this.getQA2();
  }

  getQA1() {
    this.dados = this.crudService.getItemSort(this.basePath, 'engType', 'type1', 'creationTime', 'desc').subscribe(dado => {
      this.reports = dado.map(e => {
        const rep = e.payload.doc.data() as Qa;
        rep.key = e.payload.doc.id;
        return rep;
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

}
