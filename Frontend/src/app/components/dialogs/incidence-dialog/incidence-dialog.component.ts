import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { Incidence } from 'src/app/models/incidence.model';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-incidence-dialog',
  templateUrl: './incidence-dialog.component.html',
  styleUrls: ['./incidence-dialog.component.css']
})
export class IncidenceDialogComponent implements OnInit {
  public incidence: Incidence;

  public types: Option[];


  constructor(public dialogRef: MatDialogRef<IncidenceDialogComponent>) {
    this.incidence = new Incidence();

    this.types = [
      { id: 1, description : 'Gol'},
      { id: 2, description : 'Autogol'},
      { id: 3, description : 'Tarjeta Amarilla'},
      { id: 4, description : 'Tarjeta Roja'},
    ];
   }

  ngOnInit(): void {
  }

  public selectType(type: any){
    this.incidence.id_type = type;
  }

  public selectPlayer(id_player: any){
    this.incidence.id_player = id_player;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
