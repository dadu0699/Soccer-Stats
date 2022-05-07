import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Result } from 'src/app/models/results.model';

@Component({
  selector: 'app-predict-dialog',
  templateUrl: './predict-dialog.component.html',
  styleUrls: ['./predict-dialog.component.css']
})
export class PredictDialogComponent implements OnInit {

  results: Result;

  constructor(public dialogRef: MatDialogRef<PredictDialogComponent>) {
    this.results = new Result();
  }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
