import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-conf',
  templateUrl: './del-conf.component.html',
  styleUrls: ['./del-conf.component.css']
})
export class DelConfComponent implements OnInit {
  rid: string;
  add_pmt_form: FormGroup;
  isdel: boolean = false;
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<DelConfComponent>) { 
    this.rid= data.rid;
  }

  ngOnInit(): void {
    this.add_pmt_form = this.fb.group({
      rid: [this.rid]
    })
  }

  submitAddPmtForm() {
    this.isdel = true;
    this.dialogRef.close(this.isdel);
  }
}
