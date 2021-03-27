import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpService } from 'src/app/_services/exp.service';

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
  head: string;
  grp: string;
  amt: string;
  pamt: string;
  purp: string;
  constructor(public fb: FormBuilder, private expService: ExpService, @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<EdtComponent>) {
    this.rid= data.rid;
    this.dt= data.dt;
    this.mode= data.mode;
    this.pto= data.pto;
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
      rid: [this.rid, [Validators.required]],
      dt: [this.dt, [Validators.required]],
      mode: [this.mode, [Validators.required]],
      pto: [this.pto, [Validators.required]],
      head: [this.head, [Validators.required]],
      grp: [this.grp, [Validators.required]],
      amt: [this.amt, [Validators.required]],
      pamt: [this,this.pamt],
      purp: [this.purp, [Validators.required]],
      usern: ['anjan'],
      type: ['PMT'],
      firm: ['ANJAN'],
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.add_pmt_form.controls[controlName].hasError(errorName);
  }

  submitAddPmtForm() {
    if (this.add_pmt_form.valid) {
      this.expService.add_exp(this.add_pmt_form.value).subscribe(res => {
        console.log(res);
        this.add_pmt_sru();
        this.isSavedFailed = false;
        this.dialogRef.close();
      }, err => {
        this.errorMessage = err.error.message;
        this.isSavedFailed = true;
      }
      )
    }
  }

}
