import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Option } from 'src/app/models/option.model';
import { Log } from 'src/app/models/log.model';

import { AdminService } from 'src/app/services/admin.service';

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
    private _adminService: AdminService,

  ) {
    this.labels = ['no.', 'photo', 'name', 'lastname', 'role', 'action', 'date', 'description', 'table'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.logs = [];

    this.roles = [
      { id: 1, description: 'Admin' },
      { id: 2, description: 'Employee' },
    ];
  }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this._adminService.report10();
      if (response['status'] === 200) {
        this.logs = response['data']
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
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
