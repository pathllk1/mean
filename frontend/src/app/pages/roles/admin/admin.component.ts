import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../_services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  content: any;
  source: any =
    {
      localdata: this.content,
      datatype: 'json',
      datafields: [
        { name: '_id', type: 'string' },
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' }
      ],
      id: '_id',
    };

    getData(): any{
      this.adminService.get_users().subscribe(
        data=> {this.content = data}
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
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    
  }

}
