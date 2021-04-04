import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TokenStorageService } from '../../../_services/token-storage.service';
import { PurchaseService } from '../../../_services/bill/purchase.service';
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
      firm: this.tokenStorageService.getUser().firm
    }
    const dialogRef = this.dialog.open(AddItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.xy.push(result);
        this.purchaseservice.add_stc_reg(result).subscribe(res => {
          console.log(res);
        });
        this.myGrid.showloadelement();
        this.getData();
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
        { name: 'rate', type: 'number' },
        { name: 'grate', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'disc', type: 'number' },
        { name: 'discamt', type: 'number' }
      ]
    };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] =
    [
      { text: 'ITEM', datafield: 'item', width: '28%' },
      { text: 'HSN', datafield: 'hsn', width: '10%' },
      { text: 'RATE', datafield: 'rate', width: '10%' },
      { text: 'QNTY', datafield: 'qty', width: '10%' },
      { text: 'GST RATE', datafield: 'grate', width: '10%' },
      { text: 'DISCOUNT', datafield: 'disc', width: '10%' },
      { text: 'DISCOUNT AMOUNT', datafield: 'discamt', align: 'right', aggregates: ['sum'], width: '10%' },
      { text: 'AMOUNT', datafield: 'total', align: 'right', aggregates: ['sum'], width: '10%' }
    ];

  createButtonsContainers(statusbar: any): void {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = 'overflow: hidden; position: relative;';
    let addButtonContainer = document.getElementById("add_dlg");
    addButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(addButtonContainer);
    let delButtonContainer = document.getElementById("del_dlg");
    delButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(delButtonContainer);
    statusbar[0].appendChild(buttonsContainer);
  }

  open_del_dialog() {
    let selectedrowindex = this.myGrid.getselectedrowindex();
    let id = this.myGrid.getrowid(selectedrowindex);
    this.xy.splice(id, 1);
    this.source.localdata = this.xy;
    this.myGrid.showloadelement();
    this.myGrid.updatebounddata();
  }
}
