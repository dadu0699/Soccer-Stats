import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  public news = [];
  public parameter: Number;

  constructor(
    private newService: NewService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.parameter = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getAll();

  }

  getAll() {
    this.newService.get()
      .then((res) => {
        this.news = [];
        res.data.forEach((post: Post) => {
          if (post.id_team == this.parameter) {
            this.news.push(post);
          }
        });
        this.news.reverse();
      })
  }

}
