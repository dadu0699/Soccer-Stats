import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public opened: boolean;

  constructor() {
    this.opened = false;
   }

   showSideNav(opened: any){
    this.opened = opened;
   }

  ngOnInit(): void {
  }

}
