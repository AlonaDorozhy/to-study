import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource, MatTableItem } from './mat-table-datasource';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table-component.scss']
})
export class MatTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MatTableItem>;
  // dataSource: MatTableDataSource;
  dataSource=new MatTableDataSource();
column: any;

rows:any;
  displayedColumns = ['title',
    'author',
    'language',
    'country',
    'imageLink',
    'link',
    'pages',
    'year',
  ];
  constructor() {
   this.rows = this.dataSource;
    console.log(this.dataSource);

  
  }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource();
   console.log(this.dataSource.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }    
}
