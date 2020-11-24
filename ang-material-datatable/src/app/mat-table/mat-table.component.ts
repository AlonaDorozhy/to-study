import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from './mat-table-datasource';
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table-component.sass']
})
export class MatTableComponent implements AfterViewInit, OnInit {
  dataSource!: MatTableDataSource;
  ColumnMode = ColumnMode;
  columns: any;
  rows: any;
  displayedColumns = ['title',
    'author',
    'language',
    'country',
    'link',
    'year'
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.rows = this.dataSource.rows;
    this.columns = this.dataSource.columns;
  }
}
