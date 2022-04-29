import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/observable.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  public hasMembership = localStorage.getItem('has_membership');
  private subscriptionName: Subscription;

  constructor(
    private commonService: CommonService
  ) {
    this.subscriptionName = this.commonService.getUpdate().subscribe
      (message => {
        this.hasMembership = localStorage.getItem('has_membership');
      });
  }

  ngOnInit() {

  }

}
