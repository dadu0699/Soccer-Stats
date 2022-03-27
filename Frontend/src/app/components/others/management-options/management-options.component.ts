import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-management-options',
  templateUrl: './management-options.component.html',
  styleUrls: ['./management-options.component.css']
})
export class ManagementOptionsComponent implements OnInit {

  @Output('create') create: EventEmitter<any>;
  @Output('edit') edit: EventEmitter<any>;
  @Output('delete') delete: EventEmitter<any>;

  constructor() {
    this.create = new EventEmitter<any>();
    this.edit = new EventEmitter<any>();
    this.delete = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  public creating() {
    this.create.emit()
  }

  public editing() {
    this.edit.emit()
  }

  public deleting() {
    this.delete.emit()
  }

}
