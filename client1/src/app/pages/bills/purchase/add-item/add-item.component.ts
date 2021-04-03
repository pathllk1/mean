import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  errorMessage = '';
  add_pmt_form: FormGroup;
  bno: string;
  bdate: Date;
  supply: string;
  user: string;
  firm: string;
  constructor(
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.bno = data.bno;
    this.bdate = data.bdate;
    this.supply = data.supply;
    this.user = data.user;
    this.firm = data.firm;
  }

  ngOnInit(): void {
    this.add_pmt_sru();
    this.onChanges_qty();
  }

  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      type: ['PURCHASE', [Validators.required]],
      bno: [this.bno, [Validators.required]],
      bdate: [this.bdate, [Validators.required]],
      supply: [this.supply, [Validators.required]],
      item: ['', [Validators.required]],
      hsn: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      qtyh: ['', [Validators.required]],
      uom: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      grate: ['', [Validators.required]],
      cgst: ['0', [Validators.required]],
      sgst: ['0', [Validators.required]],
      igst: ['0', [Validators.required]],
      disc: ['', [Validators.required]],
      discamt: ['', [Validators.required]],
      total: ['', [Validators.required]],
      project: ['', [Validators.required]],
      user: ['1', [Validators.required]],
      firm: ['1', [Validators.required]]
    })
  }

  submitAddPmtForm() {
    if (this.add_pmt_form.valid) {
      this.dialogRef.close(this.add_pmt_form.value);
    }
  }

  onChanges_qty(): void {
    this.add_pmt_form.controls['qty'].valueChanges.subscribe(val => {
      if(this.add_pmt_form.controls['rate'].value == ''){
        alert("Please fill Rate First!");
      } else {
        this.add_pmt_form.controls['total'].setValue(val * this.add_pmt_form.controls['rate'].value);
      }
    })
  }
}
