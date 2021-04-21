import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchaseService } from '../../../../_services/bill/purchase.service';


@Component({
  selector: 'app-edt-item',
  templateUrl: './edt-item.component.html',
  styleUrls: ['./edt-item.component.css']
})
export class EdtItemComponent implements OnInit {
  errorMessage = '';
  add_pmt_form: FormGroup;
  xy: any = [];
  qt: number = 0;
  qt1: number = 0;
  dta: {
    type: {type: String},
    bno: {type: String},
    bdate: {type: Date},
    supply: {type: String},
    item: {type: String},
    hsn: {type: String},
    qty: {type: Number},
    qtyh: {type: Number},
    uom: {type: String},
    rate: {type: Number},
    grate: {type: Number},
    cgst: {type: Number},
    sgst: {type: Number},
    igst: {type: Number},
    disc: {type: Number},
    discamt: {type: Number},
    total: {type: Number},
    project: {type: String},
    user: {type: String},
    firm: {type: String}
  }
  constructor(
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<EdtItemComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private purchaseservice: PurchaseService
  ) { 
    this.dta = data.dta;
    this.xy = data.auto;
    this.qt = data.edtqt;
    this.qt1 = data.dta.qty;
  }

  ngOnInit(): void {
    this.add_pmt_sru();
    this.onChanges_qty();
    this.onChanges_disc();
    console.log ("qty in hand " + this.qt)
  }

  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      type: [this.dta.type, [Validators.required]],
      bno: [this.dta.bno, [Validators.required]],
      bdate: [this.dta.bdate, [Validators.required]],
      supply: [this.dta.supply, [Validators.required]],
      item: [this.dta.item, [Validators.required]],
      hsn: [this.dta.hsn, [Validators.required]],
      qty: [this.dta.qty, [Validators.required]],
      qtyh: [this.dta.qtyh, [Validators.required]],
      uom: [this.dta.uom, [Validators.required]],
      rate: [this.dta.rate, [Validators.required]],
      grate: [this.dta.grate, [Validators.required]],
      cgst: [this.dta.cgst, [Validators.required]],
      sgst: [this.dta.sgst, [Validators.required]],
      igst: [this.dta.igst, [Validators.required]],
      disc: [this.dta.disc, [Validators.required]],
      discamt: [this.dta.discamt, [Validators.required]],
      total: [this.dta.total, [Validators.required]],
      project: [this.dta.project, [Validators.required]],
      user: [this.dta.user, [Validators.required]],
      firm: [this.dta.firm, [Validators.required]]
    })
  }

  submitAddPmtForm() {
    if (this.add_pmt_form.valid) {
      this.dialogRef.close(this.add_pmt_form.value);
    }
  }

  onChanges_qty(): void {
    this.add_pmt_form.controls['qty'].valueChanges.subscribe(val => {
      if (this.add_pmt_form.controls['rate'].value == '') {
        alert("Please fill Rate First!");
      } else {
        this.add_pmt_form.controls['total'].setValue(val * this.add_pmt_form.controls['rate'].value);
        this.add_pmt_form.controls['cgst'].setValue((this.add_pmt_form.controls['total'].value * this.add_pmt_form.controls['grate'].value / 100) / 2);
        this.add_pmt_form.controls['sgst'].setValue((this.add_pmt_form.controls['total'].value * this.add_pmt_form.controls['grate'].value / 100) / 2);
        this.add_pmt_form.controls['igst'].setValue(this.add_pmt_form.controls['total'].value * this.add_pmt_form.controls['grate'].value / 100);
        this.add_pmt_form.controls['qtyh'].setValue(parseFloat(val) - Number(this.qt1) + Number(this.qt));
        this.add_pmt_form.controls['disc'].setValue(0);
      }
    })
  }

  onChanges_disc(): void {
    this.add_pmt_form.controls['disc'].valueChanges.subscribe(val => {
      this.add_pmt_form.controls['discamt'].setValue((this.add_pmt_form.controls['rate'].value * this.add_pmt_form.controls['qty'].value) * val / 100);
      var x = (this.add_pmt_form.controls['qty'].value * this.add_pmt_form.controls['rate'].value) - this.add_pmt_form.controls['discamt'].value;
      this.add_pmt_form.controls['cgst'].setValue((x * this.add_pmt_form.controls['grate'].value / 100) / 2);
      this.add_pmt_form.controls['sgst'].setValue((x * this.add_pmt_form.controls['grate'].value / 100) / 2);
      this.add_pmt_form.controls['igst'].setValue(x * this.add_pmt_form.controls['grate'].value / 100);
    })
  }
}
