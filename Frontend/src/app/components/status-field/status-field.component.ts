import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-status-field',
  templateUrl: './status-field.component.html',
  styleUrls: ['./status-field.component.css']
})
export class StatusFieldComponent implements OnInit {

  @Input('options') options!: Option[];
  @Output('selectOption') selectOption: EventEmitter<number>;

  constructor() {
    this.selectOption = new EventEmitter<number>();
  }

  public selectedOption(id: number){
    this.selectOption.emit(id);
  }

  ngOnInit(): void {
  }

}
