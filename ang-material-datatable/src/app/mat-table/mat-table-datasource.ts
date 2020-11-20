import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';


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

export class MatTableDataSource extends DataSource<MatTableItem> {
  ColumnMode = ColumnMode;
  SelectionType  = SelectionType ;
  data: MatTableItem[];
  paginator: MatPaginator;
  sort: MatSort;
  rows = [];
  // columns = [
  //  { name:'title'},
  //  {  name:'author'},
  //  {  name:'language'},
  //  {  name:'country'},
  //  {  name:'imageLink'},
  //  {  name:'link'},
  //  {  name:'pages'},
  //  {  name:'year'},
  //   ];


  constructor() {
    super();
    this.fetch((d: MatTableItem[] | any) => {
      this.rows = d;
      this.data = d;
      console.log(this.rows);
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



  connect(): Observable<MatTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() { }

  private getPagedData(data: MatTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: MatTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'author': return compare (a.author , b.author, isAsc);
        case 'language': return compare (a.language , b.language, isAsc);
        case 'country': return compare (a.country , b.country, isAsc);
        case 'pages': return compare (a.pages , b.pages, isAsc);
        case 'year': return compare (a.year , b.year, isAsc);
        default: return 0;
      }
    });
  }
}


function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
