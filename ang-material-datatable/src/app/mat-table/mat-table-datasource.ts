
import { DataSource } from '@angular/cdk/collections';
import { TableItems } from './mat-table-interface'
import { Observable } from 'rxjs';
export class MatTableDataSource extends DataSource<TableItems>  {
  connect(): Observable<TableItems[] | readonly TableItems[]> {
    throw new Error('Method not implemented.');
  }

  disconnect() { }
  data: TableItems[] | undefined;
  columns!: string[];
  rows = [];
  constructor() {
    super();
    this.fetch((data: TableItems[] | any) => {
      this.rows = data;
      this.data = data;
      this.columns = Object.keys(data[0])
    });
  }

  fetch(data: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/books.json`);
    req.onload = () => {
      const books = JSON.parse(req.response);
      data(books);
    };
    req.send();
  }
}
