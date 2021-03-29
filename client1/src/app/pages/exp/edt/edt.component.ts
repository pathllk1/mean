import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ExpService } from 'src/app/_services/exp.service';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-edt',
  templateUrl: './edt.component.html',
  styleUrls: ['./edt.component.css']
})
export class EdtComponent implements OnInit {
  errorMessage = '';
  isSavedFailed = false;
  add_pmt_form: FormGroup;
  rid: string;
  dt: string;
  mode: string;
  pto: string;
  type: string;
  head: string;
  grp: string;
  amt: string;
  pamt: string;
  purp: string;

  constructor(public fb: FormBuilder, private expService: ExpService, @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<EdtComponent>, private tokenStorageService: TokenStorageService) {
    this.rid= data.rid;
    this.dt= data.dt;
    this.mode= data.mode;
    this.pto= data.pto;
    this.type= data.type;
    this.head= data.head;
    this.grp= data.grp;
    this.amt= data.amt;
    this.pamt= data.pamt;
    this.purp= data.purp;
  }

  ngOnInit(): void {
    this.add_pmt_sru();
  }

  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      _id: [this.rid],
      rid: [this.rid, [Validators.required]],
      dt: [this.dt, [Validators.required]],
      mode: [this.mode, [Validators.required]],
      pto: [this.pto, [Validators.required]],
      head: [this.head, [Validators.required]],
      grp: [this.grp, [Validators.required]],
      amt: [this.amt, [Validators.required]],
      pamt: [this.pamt, [Validators.required]],
      purp: [this.purp, [Validators.required]],
      usern: [this.tokenStorageService.getUser().username],
      type: [this.type, [Validators.required]],
      firm: [this.tokenStorageService.getUser().firm]
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.add_pmt_form.controls[controlName].hasError(errorName);
  }

  submitAddPmtForm() {
    if (this.add_pmt_form.valid) {
      this.expService.update_exp(this.add_pmt_form.value).subscribe(res => {
        console.log(res);
        this.add_pmt_sru();
        this.isSavedFailed = false;
        this.dialogRef.close(this.add_pmt_form.value);
      }, err => {
        this.errorMessage = err.error.message;
        this.isSavedFailed = true;
      }
      )
    }
  }

}
