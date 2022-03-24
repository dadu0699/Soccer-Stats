import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Input('isHomePage') isHomePage: boolean;


  constructor() {
    this.isHomePage = true;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
