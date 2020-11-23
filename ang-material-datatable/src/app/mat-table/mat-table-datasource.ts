
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

export interface MatTableItem {
  title: string;
  author: string;
  language: string;
  country: string;
  imageLink: string;
  link: string;
  pages: any;
  year: any;
}

export class MatTableDataSource extends DataSource<MatTableItem>  {
  connect(collectionViewer: CollectionViewer): Observable<MatTableItem[] | readonly MatTableItem[]> {
    throw new Error('Method not implemented.');
  }

  disconnect(){}
  data: MatTableItem[] | undefined;
  columns!: string[];
  rows = [];
  constructor() {
    super();
    this.fetch((data: MatTableItem[] | any) => {
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


