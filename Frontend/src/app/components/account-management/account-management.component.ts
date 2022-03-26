import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  @Input('currentStatus') currentStatus!: number;
  @Output('setNewStatus') sendStatus: EventEmitter<Option>;

  public status: Option[];
  public newStatus!: number;
  public description!: string;

  constructor() {
    this.status = [
      { id: 1, description: 'Activa' },
      { id: 2, description: 'Congelada' },
    ];

    this.sendStatus = new EventEmitter<Option>();
  }

  ngOnInit(): void {
  }

  public manageStatus(status: any) {
    this.newStatus = status
  }

  public sendNewStatus() {
    this.sendStatus.emit(
      {
        id: this.newStatus,
        description: this.description
      }
    );
  }

}
