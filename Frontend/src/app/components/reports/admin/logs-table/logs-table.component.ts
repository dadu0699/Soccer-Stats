import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Option } from 'src/app/models/option.model';
import { Log } from 'src/app/models/log.model';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.css']
})
export class LogsTableComponent implements OnInit {

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public logs: Log[];
  public roles: Option[];

  constructor(
    private _snackBar: MatSnackBar,
  ) {
    this.labels = ['no.', 'photo', 'name', 'lastname', 'role', 'action', 'date', 'description', 'table'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.logs = [];
    this.logs = [
      {
        id: 0,
        user_photo: 'https://pbs.twimg.com/profile_images/441438607828451328/g24eSR4S_400x400.jpeg',
        user_name: 'name',
        user_lastname: 'lastname',
        user_role: 1,
        action: 'Acción',
        date: 'date',
        description: 'descripción',
        database_table: 'tabla',
      },
    ]; //TODO Delete info
    this.roles = [
      { id: 1, description: 'Admin' },
      { id: 2, description: 'Employee' },
    ];
  }

  ngOnInit(): void {
    this.fillTable(); //TODO Read Bitácora
  }

  private fillTable() {
    this.dataTable = [];
    this.logs.forEach((element: Log) => {
      this.dataTable.push({
        no: element.id,
        photo: element.user_photo,
        name: element.user_name,
        lastname: element.user_lastname,
        role: this.roles[element.user_role-1].description,
        action: element.action,
        date: element.date,
        description: element.description,
        table: element.database_table,
      });

      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }
  private showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
