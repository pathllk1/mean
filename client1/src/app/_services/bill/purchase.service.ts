import { Injectable } from '@angular/core';
import { DexieService } from "../dexie.service";

export interface Items {
  item: string;
  hsn: string;
  qty: string;
  uom: string;
  rate: string;
  grate: string;
  total: string;
  user: string;
  firm: string;
}

export interface ItemsWithID extends Items {
  id: number;
}

@Injectable({
  providedIn: 'root'
})


export class PurchaseService {
  table: Dexie.Table<ItemsWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('items');
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }

}