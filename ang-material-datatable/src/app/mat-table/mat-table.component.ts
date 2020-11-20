import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource, MatTableItem, fetchData } from './mat-table-datasource';
// import { fetchData } from './mat-table-datasource';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
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
  ColumnMode = ColumnMode;
  SelectionType  = SelectionType ;
rows = new fetchData()
// rows:any;
  displayedColumns = ['title',
    'author',
    'language',
    'country',
    'imageLink',
    'link',
    'pages',
    'year',
  ];
   columns = [
   { name:'title'},
   {  name:'author'},
   {  name:'language'},
   {  name:'country'},
   {  name:'imageLink'},
   {  name:'link'},
   {  name:'pages'},
   {  name:'year'},
    ];
  constructor() {
  //  this.rows = this.dataSource;
  
  
  }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource();
   console.log(this.dataSource.data);
   console.log(this.rows.rows);

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log(this.table.dataSource);

  }    
}
