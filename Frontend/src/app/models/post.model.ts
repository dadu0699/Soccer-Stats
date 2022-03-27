export class Post {
  public id!: number;
  public id_user?: number;
  public id_team!: number;
  public title: string;
  public description: string;
  public date: string;

  public team: string;

  constructor() {
    this.title = "";
    this.description = "";
    this.date = "";
    this.team = "";
  }
}
