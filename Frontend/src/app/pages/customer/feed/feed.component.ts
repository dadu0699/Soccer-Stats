import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/post.model';

import { NewService } from 'src/app/services/new.service';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public posts: Post[];

  constructor(
    private _snackBar: MatSnackBar,
    private _postService: NewService
  ) {
    this.posts = [];
  }

  async ngOnInit(): Promise<void> {
    await this.getNews();
  }

  async getNews(){
    try {
      const response = await this._postService.get();
      if (response['status'] === 200) {
        this.posts = response['data'];
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async selectTeam(id_team: number): Promise<void>{
    try {
      const response = await this._postService.filter(id_team);
      if (response['status'] === 200) {
        this.posts = response['data'];
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
