import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { PurchaseService } from '../../../../_services/bill/purchase.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface autos {
  item: string;
  project: string;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {
  errorMessage = '';
  add_pmt_form: FormGroup;
  bno: string;
  bdate: Date;
  supply: string;
  user: string;
  firm: string;
  xy: any = [];
  qt: number = 0;
  private subs = new Subscription();
  options: autos[] = [];
  filteredJSONDataOptions_item: Observable<any[]>;
  filteredJSONDataOptions_proj: Observable<any[]>;
  constructor(
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private purchaseservice: PurchaseService
  ) {
    this.bno = data.bno;
    this.bdate = data.bdate;
    this.supply = data.supply;
    this.user = data.user;
    this.firm = data.firm;
    this.xy = data.auto;
  }

  ngOnInit(): void {
    this.add_pmt_sru();
    this.onChanges_qty();
    this.onChanges_disc();

    this.subs.add(this.purchaseservice.list_reg().subscribe((data) => {
      this.options = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      }));
    this.filteredJSONDataOptions_item = this.add_pmt_form.controls['item'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_item(value))
    );
    this.filteredJSONDataOptions_proj = this.add_pmt_form.controls['project'].valueChanges.pipe(
      startWith(''),
      map(value => this.json_data_filter_proj(value))
    );


  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  private json_data_filter_item(value: string): string[] {
    const filterValue = value.toLowerCase();
    let newList = [];
    this.options.forEach(element => {
      if (element.item.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({ 'item': element.item });
      }
    })
    return newList;
  }

  private json_data_filter_proj(value: string): string[] {
    const filterValue = value.toLowerCase();
    let newList = [];
    this.options.forEach(element => {
      if (element.project.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        newList.push({ 'project': element.project });
      }
    })
    return newList;
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
      cgst: [0, [Validators.required]],
      sgst: [0, [Validators.required]],
      igst: [0, [Validators.required]],
      disc: ['', [Validators.required]],
      discamt: ['', [Validators.required]],
      total: ['', [Validators.required]],
      project: ['', [Validators.required]],
      user: [this.user, [Validators.required]],
      firm: [this.firm, [Validators.required]]
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
        this.add_pmt_form.controls['qtyh'].setValue(Number(this.qt) + parseFloat(val));
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

  onBlur_item(event: any): void {
    this.xy.forEach(element => {
      if (element.item == event.target.value) {
        this.add_pmt_form.controls['hsn'].setValue(element.hsn);
        this.add_pmt_form.controls['grate'].setValue(element.grate);
        this.add_pmt_form.controls['rate'].setValue(element.rate);
        this.add_pmt_form.controls['uom'].setValue(element.uom);
        this.add_pmt_form.controls['qtyh'].setValue(element.qty);
        this.qt = element.qty;
        return;
      }
    });
  }
}
