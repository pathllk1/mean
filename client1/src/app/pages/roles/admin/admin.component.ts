import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import {AdminService} from '../../../_services/admin.service';

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
  constructor(private adminService: AdminService) { }
  ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getData();
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

    getData(): any{
      this.adminService.get_users().subscribe(
        data=> {
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
      data => {console.log(data)},
      err => {console.log(err)}
    );
  }
}
