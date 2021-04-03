import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TokenStorageService } from '../../../_services/token-storage.service';
import { Items, PurchaseService } from '../../../_services/bill/purchase.service';
import { Stock } from '../../../models/stock';
import { AddItemComponent } from './add-item/add-item.component';



@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})


export class PurchaseComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  add_pmt_form: FormGroup;
  xy: any = [];
  constructor(public fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private purchaseservice: PurchaseService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.add_pmt_sru();
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
      firm: this.tokenStorageService.getUser().firm
    }
    const dialogRef = this.dialog.open(AddItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.xy.push(result);
        this.source.localdata = this.xy;
        this.myGrid.showloadelement();
        this.myGrid.updatebounddata();
      }
    });
  }


  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      bno: ['', [Validators.required]],
      bdate: ['', [Validators.required]],
      supply: ['', [Validators.required]],
      addr: ['', [Validators.required]],
      gstin: ['', [Validators.required]],
      state: ['', [Validators.required]],
      gtot: ['', [Validators.required]],
      disc: ['', [Validators.required]],
      cgst: ['', [Validators.required]],
      usern: [this.tokenStorageService.getUser().username],
      sgst: ['', [Validators.required]],
      firm: [this.tokenStorageService.getUser().firm],
      igst: ['', [Validators.required]],
      rof: ['', [Validators.required]],
      ntot: ['', [Validators.required]]
    })
  }

  source: any =
    {
      localdata: null,
      datatype: 'json',
      datafields: [
        { name: 'item', type: 'string' },
        { name: 'hsn', type: 'string' },
        { name: 'qty', type: 'string' },
        { name: 'uom', type: 'string' },
        { name: 'rate', type: 'string' },
        { name: 'grate', type: 'string' },
        { name: 'total', type: 'string' },
        { name: 'user', type: 'string' },
        { name: 'firm', type: 'string' }
      ]
    };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] =
    [
      { text: 'ITEM', datafield: 'item' },
      { text: 'HSN', datafield: 'hsn' },
      { text: 'RATE', datafield: 'rate' },
      { text: 'QNTY', datafield: 'qty' },
      { text: 'GST RATE', datafield: 'grate' },
      { text: 'DISCOUNT', datafield: 'user' },
      { text: 'DISCOUNT AMOUNT', datafield: 'firm', align: 'right', aggregates: ['sum'] },
      { text: 'AMOUNT', datafield: 'total', align: 'right', aggregates: ['sum'] }
    ];

  createButtonsContainers(statusbar: any): void {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = 'overflow: hidden; position: relative;';
    let addButtonContainer = document.getElementById("add_dlg");
    addButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(addButtonContainer);

    statusbar[0].appendChild(buttonsContainer);
  }
}
