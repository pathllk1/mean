import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ExpService } from 'src/app/_services/exp.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  add_pmt_form: FormGroup;

  constructor(public fb: FormBuilder, private expService: ExpService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getData();
  }

  getData(): any {
    this.expService.list_all().subscribe(
      data => {
        this.source.localdata = data;
        this.myGrid.updatebounddata();
      }
    )
  }


  source: any =
    {
      localdata: null,
      datatype: 'json',
      datafields: [
        { name: '_id', type: 'string' },
        { name: 'dt', type: 'dt' },
        { name: 'pto', type: 'pto' },
        { name: 'mode', type: 'mode' },
        { name: 'head', type: 'head' },
        { name: 'grp', type: 'grp' },
        { name: 'amt', type: 'amt' },
      ]
    };

  getWidth(): any {
    if (document.body.offsetWidth < 1200) {
      return '90%';
    }

    return 1200;
  }
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [
      { text: 'ID', datafield: '_id' },
      { text: 'DATE', datafield: 'dt', cellsalign: 'right', cellsformat: 'dd-MMMM-yyyy' },
      { text: 'PAID TO', datafield: 'pto' },
      { text: 'MODE', datafield: 'mode' },
      { text: 'HEAD', datafield: 'head' },
      { text: 'GROUP', datafield: 'grp' },
      { text: 'AMOUNT', datafield: 'amt', align: 'right' },
    ];

  createButtonsContainers(statusbar: any): void {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = 'overflow: hidden; position: relative;';
    let addButtonContainer = document.getElementById("add_dlg");
    addButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(addButtonContainer);
    let edtButtonContainer = document.getElementById("edt_dlg");
    edtButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(edtButtonContainer);
    statusbar[0].appendChild(buttonsContainer);
  }

  ngOnInit(): void {
    this.add_pmt_sru();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = '1200px';
      dialogConfig.minHeight = '400px';
      const dialogRef = this.dialog.open(AddComponent, dialogConfig);
  }

  add_pmt_sru() {
    this.add_pmt_form = this.fb.group({
      rid: ['', [Validators.required]],
      dt: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      pto: ['', [Validators.required]],
      head: ['', [Validators.required]],
      grp: ['', [Validators.required]],
      amt: ['', [Validators.required]],
      pamt: ['', [Validators.required]],
      purp: ['', [Validators.required]],
      usern: ['anjan'],
      type: ['PMT'],
      firm: ['ANJAN'],
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.add_pmt_form.controls[controlName].hasError(errorName);
  }  

  submitAddPmtForm(){
    if(this.add_pmt_form.valid){
      this.expService.add_exp(this.add_pmt_form.value).subscribe(res => {
        console.log(res);
        this.add_pmt_sru();
      })
    }
  }
}
