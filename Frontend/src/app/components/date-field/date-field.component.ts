import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css'],
  providers: [DatePipe],
})
export class DateFieldComponent implements OnInit {

  @Input('date') date!: string;
  @Input('description') description!: string;
  @Input('readonly') readonly: boolean;

  @Output('setDate') sendDate: EventEmitter<string>;

  constructor(
    private _datepipe: DatePipe,
  ) {
    this.readonly = false;
    this.sendDate = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  public setDate(date: any) {
    let formattedDate = this._datepipe
      .transform(date, 'yyyy-MM-dd')
      ?.toString();
    this.sendDate.emit(formattedDate)
  }

}
