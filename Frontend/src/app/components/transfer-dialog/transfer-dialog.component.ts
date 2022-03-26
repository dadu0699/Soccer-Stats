import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Transference } from 'src/app/models/transference.model';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.css']
})
export class TransferDialogComponent implements OnInit {
  public transference: Transference;

  constructor(public dialogRef: MatDialogRef<TransferDialogComponent>) {
    this.transference = new Transference();
  }

  ngOnInit(): void {
  }

  public selectTeam(id_team: any) {
    this.transference.id_team_destination = id_team;
  }

  public setStartDate(date: any) {
    this.transference.start_date = date;
  }

  public setEndDate(date: any) {
    this.transference.end_date = date;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
