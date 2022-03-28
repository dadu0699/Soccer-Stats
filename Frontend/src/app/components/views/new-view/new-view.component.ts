import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Option } from 'src/app/models/option.model';
import { IncidenceDialogComponent } from '../../dialogs/incidence-dialog/incidence-dialog.component';
import { MatchService } from 'src/app/services/match.service';
import { Post } from 'src/app/models/post.model';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'app-new-view',
  templateUrl: './new-view.component.html',
  styleUrls: ['./new-view.component.css']
})
export class NewViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public post: Post;
  public allNews: Post[];

  public readonly: boolean;
  public allowEditing: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private newService: NewService,
  ) {
    this.labels = ['no.', 'title', 'description', 'team', 'date'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.post = new Post();
    this.allNews = []
    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtener todas las noticias
   */
  getAll = () => {
    this.newService.get()
      .then((response) => {
        this.allNews = [];
        this.dataTable = [];
        this.allNews = response.data;
        this.fillTable();
      });
  }

  private fillTable() {
    this.allNews.forEach((element: Post) => {
      this.dataTable.push({
        no: element.id,
        title: element.title,
        description: element.description,
        team: element.team,
        date: element.date,
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public selectTeam(id_team: any) {
    this.post.id_team = id_team;
  }

  public setDate(date: any) {
    this.post.date = date;
  }

  public selectGame(id: any) {
    this.readonly = true;
    this.allowEditing = false;
    let post: Post = this.allNews.find(el => el.id === id) || new Post();
    this.post = post;
  }

  public create() {
    this.post.id_user = Number(localStorage.getItem('id_user'));
    this.newService.create(this.post)
      .then((response) => {
        this.showSnackbar('New created successfully');
        this.getAll();
        this.post = new Post();
        this.readonly = false;
        this.allowEditing = false;
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });

  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
