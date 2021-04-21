import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TokenStorageService } from '../../../_services/token-storage.service';
import { PurchaseService } from '../../../_services/bill/purchase.service';
import { Stock } from '../../../models/stock';
import { AddItemComponent } from './add-item/add-item.component';
import { EdtItemComponent } from './edt-item/edt-item.component';

function findAndReplace(object, keyvalue, name) {
  object.map(function (a) {
    if (a.item == keyvalue) {
      a.qty = name
    }
  })
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})


export class PurchaseComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  add_pmt_form: FormGroup;
  xy: any = [];
  stc: any = [];
  constructor(public fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private purchaseservice: PurchaseService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.add_pmt_sru();
    this.purchaseservice.list_stc().subscribe((res: any) => {
      res.forEach(element => {
        var x = {
          item: element.item,
          qty: element.qty,
          rate: element.rate,
          grate: element.grate,
          uom: element.uom,
          hsn: element.hsn,
          total: element.total,
          user: element.user,
          firm: element.firm
        }
        this.stc.push(x);
      });
    })
  }

  getData(): any {
    this.purchaseservice.list_reg().subscribe(res => {
      this.source.localdata = res;
      this.myGrid.updatebounddata();
    })
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1000px';
    dialogConfig.minHeight = '400px';
    dialogConfig.data = {
      bno: this.add_pmt_form.controls['bno'].value,
      bdate: this.add_pmt_form.controls['bdate'].value,
      supply: this.add_pmt_form.controls['supply'].value,
      user: this.tokenStorageService.getUser().username,
      firm: this.tokenStorageService.getUser().firm,
      auto: this.stc
    }
    const dialogRef = this.dialog.open(AddItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.xy.push(result);

        this.add_pmt_form.controls['gtot'].setValue(parseFloat(this.add_pmt_form.controls['gtot'].value) + parseFloat(result.total));
        this.add_pmt_form.controls['disc'].setValue(parseFloat(this.add_pmt_form.controls['disc'].value) + parseFloat(result.discamt));
        this.add_pmt_form.controls['cgst'].setValue(parseFloat(this.add_pmt_form.controls['cgst'].value) + parseFloat(result.cgst));
        this.add_pmt_form.controls['sgst'].setValue(parseFloat(this.add_pmt_form.controls['sgst'].value) + parseFloat(result.sgst));
        this.add_pmt_form.controls['igst'].setValue(parseFloat(this.add_pmt_form.controls['igst'].value) + parseFloat(result.igst));
        this.add_pmt_form.controls['ntot'].setValue(parseFloat(this.add_pmt_form.controls['gtot'].value) + parseFloat(this.add_pmt_form.controls['igst'].value) - parseFloat(this.add_pmt_form.controls['disc'].value));
        this.myGrid.showloadelement();
        this.source.localdata = this.xy;
        this.myGrid.updatebounddata();
        let m = 0;
        this.stc.forEach(element => {
          if (element.item == result.item) {
            m = m + 1;
          }
        });
        if (m > 0) {
          console.log(m + " nos record fetched")
        }
        else {
          var l = {
            item: result.item,
            qty: result.qtyh,
            rate: result.rate,
            grate: result.grate,
            uom: result.uom,
            hsn: result.hsn,
            total: result.total,
            user: result.user,
            firm: result.firm
          }
          this.stc.push(l);
        }
        findAndReplace(this.stc, result.item, result.qtyh)
      }
    });
  }

  open_edt_Dialog() {
    let selectedrowindex = this.myGrid.getselectedrowindex();
    let id = this.myGrid.getrowdata(selectedrowindex);
    let id1 = this.myGrid.getrowid(selectedrowindex);
    let edtqt = 0;
    this.stc.forEach(element => {
      if(element.item == id.item){
        edtqt = element.qty;
      }
    });
    if (selectedrowindex > -1) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = '1000px';
      dialogConfig.minHeight = '400px';
      dialogConfig.data = {
        dta: id,
        auto: this.stc,
        edtqt: edtqt
      }
      const dialogRef = this.dialog.open(EdtItemComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.xy.splice(id1, 1);
          this.xy.push(result);
          console.log(this.xy)

          this.add_pmt_form.controls['gtot'].setValue(parseFloat(this.add_pmt_form.controls['gtot'].value) + parseFloat(result.total) - parseFloat(id.total));
          this.add_pmt_form.controls['disc'].setValue(parseFloat(this.add_pmt_form.controls['disc'].value) + parseFloat(result.discamt) - parseFloat(id.discamt));
          this.add_pmt_form.controls['cgst'].setValue(parseFloat(this.add_pmt_form.controls['cgst'].value) + parseFloat(result.cgst) - parseFloat(id.cgst));
          this.add_pmt_form.controls['sgst'].setValue(parseFloat(this.add_pmt_form.controls['sgst'].value) + parseFloat(result.sgst) - parseFloat(id.sgst));
          this.add_pmt_form.controls['igst'].setValue(parseFloat(this.add_pmt_form.controls['igst'].value) + parseFloat(result.igst) - parseFloat(id.igst));
          this.add_pmt_form.controls['ntot'].setValue(parseFloat(this.add_pmt_form.controls['gtot'].value) + parseFloat(this.add_pmt_form.controls['igst'].value) - parseFloat(this.add_pmt_form.controls['disc'].value));
          this.myGrid.showloadelement();
          this.source.localdata = this.xy;
          this.myGrid.updatebounddata();
          findAndReplace(this.stc, result.item, result.qtyh)
        }
      });
    } else {
      alert("Please select a Data first!");
    }
  }

  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      bno: ['', [Validators.required]],
      bdate: ['', [Validators.required]],
      supply: ['', [Validators.required]],
      addr: ['', [Validators.required]],
      gstin: ['', [Validators.required]],
      state: ['', [Validators.required]],
      gtot: [0.00, [Validators.required]],
      disc: [0.00, [Validators.required]],
      cgst: [0.00, [Validators.required]],
      usern: [this.tokenStorageService.getUser().username],
      sgst: [0.00, [Validators.required]],
      firm: [this.tokenStorageService.getUser().firm],
      igst: [0.00, [Validators.required]],
      rof: [0.00, [Validators.required]],
      ntot: [0.00, [Validators.required]]
    })
  }

  source: any =
    {
      localdata: null,
      datatype: 'json',
      datafields: [
        { name: 'item', type: 'string' },
        { name: 'hsn', type: 'string' },
        { name: 'qty', type: 'number' },
        { name: 'qtyh', type: 'string' },
        { name: 'uom', type: 'string' },
        { name: 'rate', type: 'number' },
        { name: 'grate', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'disc', type: 'number' },
        { name: 'discamt', type: 'number' },
        { name: 'bno', type: 'string' },
        { name: 'bdate', type: 'bdate' },
        { name: 'type', type: 'string' },
        { name: 'supply', type: 'string' },
        { name: 'cgst', type: 'number' },
        { name: 'sgst', type: 'number' },
        { name: 'igst', type: 'number' },
        { name: 'project', type: 'string' },
        { name: 'firm', type: 'string' },
        { name: 'user', type: 'string' }
      ]
    };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] =
    [
      { text: 'ITEM', datafield: 'item', width: '26%' },
      { text: 'HSN', datafield: 'hsn', width: '10%' },
      { text: 'RATE', datafield: 'rate', width: '8%' },
      { text: 'QNTY', datafield: 'qty', width: '8%' },
      { text: 'U.O.M', datafield: 'uom', width: '10%' },
      { text: 'QNTYh', datafield: 'qtyh', hidden: true },
      { text: 'GST RATE', datafield: 'grate', width: '8%' },
      { text: 'DISCOUNT', datafield: 'disc', width: '8%' },
      { text: 'DIS. AMOUNT', datafield: 'discamt', align: 'right', aggregates: ['sum'], width: '10%' },
      { text: 'AMOUNT', datafield: 'total', align: 'right', aggregates: ['sum'], width: '10%' },
      { text: 'type', datafield: 'type', hidden: true },
      { text: 'bno', datafield: 'bno', hidden: true },
      { text: 'bdate', datafield: 'bdate', hidden: true },
      { text: 'supply', datafield: 'supply', hidden: true },
      { text: 'cgst', datafield: 'cgst', hidden: true },
      { text: 'sgst', datafield: 'sgst', hidden: true },
      { text: 'igst', datafield: 'igst', hidden: true },
      { text: 'project', datafield: 'project', hidden: true },
      { text: 'firm', datafield: 'firm', hidden: true },
      { text: 'user', datafield: 'user', hidden: true },
    ];

  createButtonsContainers(statusbar: any): void {
    statusbar[0].appendChild(document.getElementById('tbar'));
  }

  open_del_dialog() {
    let selectedrowindex = this.myGrid.getselectedrowindex();
    let id = this.myGrid.getrowid(selectedrowindex);
    if (selectedrowindex > -1) {
      this.xy.splice(id, 1);
      this.source.localdata = this.xy;
      this.myGrid.showloadelement();
      this.myGrid.updatebounddata();
    }else{
      alert("Please select a Data first!");
    }
  }

  save_bill() {
    this.xy.forEach(element => {
      this.purchaseservice.add_stc_reg(element).subscribe(res => {
        console.log(res);
      })
    });
  }
}
