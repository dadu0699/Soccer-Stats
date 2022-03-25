import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements OnInit, AfterViewInit {
  @Input() pageSize: number;
  @Input() dataSource: MatTableDataSource<any>;

  @Input() title: string;
  @Input() subtitle: string;
  @Input('labels') displayedColumns: Array<string>;
  @Input('data') data: Array<any>;

  @Output('selectObject') selectObject: EventEmitter<any>;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.pageSize = 5;
    this.dataSource = new MatTableDataSource<any>();

    this.title = '';
    this.subtitle = '';
    this.displayedColumns = [];
    this.data = [];

    this.selectObject = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public focus(element: any) {
    this.selectObject.emit(element);
  }


}
