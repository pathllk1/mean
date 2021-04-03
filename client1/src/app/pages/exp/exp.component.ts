import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ExpService } from 'src/app/_services/exp.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AddComponent } from './add/add.component';
import { EdtComponent } from './edt/edt.component';
import { Exp } from 'src/app/models/exp';
import { DelConfComponent } from '../alerts/del-conf/del-conf.component';

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
        let xy = [];
        for (let obj of data) {
          let cd = {
            _id: obj._id,
            rid: obj.rid,
            dt: moment(obj.dt).utc().format('DD-MM-YYYY'),
            pto: obj.pto,
            mode: obj.mode,
            head: obj.head,
            grp: obj.grp,
            amt: obj.amt,
            pamt: obj.pamt,
            purp: obj.purp,
            type: obj.type
          }
          xy.push(cd)
        }
        this.source.localdata = xy;
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
        { name: 'dt', type: 'string' },
        { name: 'pto', type: 'string' },
        { name: 'mode', type: 'string' },
        { name: 'head', type: 'string' },
        { name: 'grp', type: 'string' },
        { name: 'amt', type: 'float' },
        { name: 'pamt', type: 'float' },
        { name: 'purp', type: 'string' },
        { name: 'type', type: 'string' },
      ]
    };

  getWidth(): any {
    if (document.body.offsetWidth < 1150) {
      return '90%';
    }

    return 1150;
  }

  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [
      { text: 'ID', datafield: '_id', hidden: true },
      { text: 'DATE', datafield: 'dt' },
      { text: 'PAID TO', datafield: 'pto' },
      { text: 'MODE', datafield: 'mode' },
      { text: 'HEAD', datafield: 'head' },
      { text: 'GROUP', datafield: 'grp' },
      { text: 'AMOUNT', datafield: 'amt', align: 'right', aggregates: ['sum'] },
      { text: 'AMOUNT', datafield: 'pamt', hidden: true },
      { text: 'purp', datafield: 'purp', hidden: true },
      { text: 'type', datafield: 'type', hidden: true },
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
    let delButtonContainer = document.getElementById("del_dlg");
    delButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(delButtonContainer);
    let xlsButtonContainer = document.getElementById("xls_export");
    xlsButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(xlsButtonContainer);
    let pdfButtonContainer = document.getElementById("pdf_export");
    pdfButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(pdfButtonContainer);
    let printButtonContainer = document.getElementById("print_data");
    printButtonContainer.style.cssText = 'float: left;';
    buttonsContainer.appendChild(printButtonContainer);
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

    dialogRef.afterClosed().subscribe(result => {
      this.myGrid.showloadelement();
      this.getData();
    });
  }

  open_edt_Dialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '1200px';
    dialogConfig.minHeight = '400px';
    let selectedrowindex = this.myGrid.getselectedrowindex();
    let id = this.myGrid.getrowdata(selectedrowindex);

    dialogConfig.data = {
      rid: id._id,
      dt: id.dt,
      mode: id.mode,
      pto: id.pto,
      type: id.type,
      head: id.head,
      grp: id.grp,
      amt: id.amt,
      pamt: id.pamt,
      purp: id.purp
    }
    const dialogRef = this.dialog.open(EdtComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.myGrid.showloadelement();
      this.getData();
    });
  }

  open_del_dialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '600px';
    dialogConfig.minHeight = '200px';
    let selectedrowindex = this.myGrid.getselectedrowindex();
    let id = this.myGrid.getrowdata(selectedrowindex);
    dialogConfig.data = {
      rid: id._id
    }
    const dialogRef = this.dialog.open(DelConfComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expService.del_exp(id._id).subscribe(res => {
          console.log(res);
          this.myGrid.showloadelement();
        this.getData();
        })
      } else {
        console.log("No Changes");
      }
    });
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

  submitAddPmtForm() {
    if (this.add_pmt_form.valid) {
      this.expService.add_exp(this.add_pmt_form.value).subscribe(res => {
        console.log(res);
        this.add_pmt_sru();
      })
    }
  }

  excelBtnOnClick() {
    this.myGrid.exportdata('xls', 'jqxGrid');
  };

  pdfBtnOnClick() {
    this.myGrid.exportdata('pdf', 'jqxGrid');
  };

  print_data() {
    let gridContent = this.myGrid.exportdata('html');
    let newWindow = window.open('', '', 'width=800, height=500'),
      document = newWindow.document.open(),
      pageContent =
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
        '<meta charset="utf-8" />\n' +
        '<title>PRINT DATA</title>\n' +
        '</head>\n' +
        '<body>\n' + gridContent + '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
  }
}
