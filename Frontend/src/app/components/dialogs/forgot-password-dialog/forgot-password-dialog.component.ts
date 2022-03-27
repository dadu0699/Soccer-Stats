import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {
  public email!: string;

  constructor(public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>) { }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
