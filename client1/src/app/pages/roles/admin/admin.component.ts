import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AdminService } from '../../../_services/admin.service';
import { NgAuthService } from "../../../_services/ng-auth.service";
import { Exp } from '../../../models/exp';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form: any = {
    to: null,
    frm: null,
    msg: null
  };
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('fbexpGrid') fbexpgrid: jqxGridComponent;
  exps: Exp[];
  constructor(private adminService: AdminService,
    public ngAuthService: NgAuthService
  ) { }
  ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getData();

    
    this.getFExp();
  }
  source: any =
    {
      localdata: null,
      datatype: 'json',
      datafields: [
        { name: '_id', type: 'string' },
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' }
      ]
    };

  source1: any =
    {
      localdata: null,
      datatype: 'json',
      datafields: [
        { name: 'id', type: 'string' },
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
  dataAdapter1: any = new jqx.dataAdapter(this.source1);
  columns1: any[] =
    [
      { text: 'ID', datafield: 'id', hidden: true },
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

  getData(): any {
    this.adminService.get_users().subscribe(
      data => {
        this.source.localdata = data;
        this.myGrid.updatebounddata();
      }
    )
  }
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [
      { text: 'ID', datafield: '_id', width: 250 },
      { text: 'User Name', datafield: 'username', cellsalign: 'right', align: 'right' },
      { text: 'Email', datafield: 'email', align: 'right', cellsalign: 'right' }
    ];
  ngOnInit(): void {
  }

  onSubmit(): void {
    const { to, frm, msg } = this.form;
    this.adminService.send_sms(to, frm, msg).subscribe(
      data => { console.log(data) },
      err => { console.log(err) }
    );
  }

  getFExp() {
    this.adminService.getFbExp().subscribe((data: any) => {
      this.exps = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Exp;
      })
    });
  }
}
