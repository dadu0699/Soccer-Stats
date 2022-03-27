import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public post: Post;

  constructor() {
    this.post = new Post();
  }

  ngOnInit(): void {
  }

  public setDate(date: any){
    this.post.date = date
  }

  public selectTeam(id_team: any){
    this.post.id_team = id_team;
  }

  public create(){
    console.log(this.post); //TODO Create
  }

}
