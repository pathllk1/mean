import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { PurchaseService } from 'src/app/_services/bill/purchase.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  constructor(private purchaseservice: PurchaseService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getData();
  }

  getData(): any {
    this.purchaseservice.list_bill().subscribe(
      (data: any) => {
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
        { name: 'bno', type: 'string' },
        { name: 'bdate', type: 'string' },
        { name: 'supply', type: 'string' },
        { name: 'gtot', type: 'float' },
        { name: 'disc', type: 'float' },
        { name: 'cgst', type: 'float' },
        { name: 'sgst', type: 'float' },
        { name: 'igst', type: 'float' },
        { name: 'rof', type: 'float' },
        { name: 'ntot', type: 'float' },
      ]
    };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [
      { text: 'ID', datafield: '_id', hidden: true },
      { text: 'BILL NO', datafield: 'bno' },
      { text: 'BILL DATE', datafield: 'bdate' },
      { text: 'SUPPLIER', datafield: 'supply' },
      { text: 'GROSS BILL', datafield: 'gtot', align: 'right', aggregates: ['sum'] },
      { text: 'DISCOUNT', datafield: 'disc', align: 'right', aggregates: ['sum'] },
      { text: 'CGST', datafield: 'cgst', align: 'right', aggregates: ['sum'] },
      { text: 'SGST', datafield: 'sgst', align: 'right', aggregates: ['sum'] },
      { text: 'IGST', datafield: 'igst', align: 'right', aggregates: ['sum'] },
      { text: 'ROUND OFF', datafield: 'rof', align: 'right', aggregates: ['sum'] },
      { text: 'NET TOTAL', datafield: 'ntot', align: 'right', aggregates: ['sum'] },
    ];

    createButtonsContainers(statusbar: any): void {
      statusbar[0].appendChild(document.getElementById('tbar1'));
    }
}
