export class Transference {
  public id!: number;
  public id_team_origin!: number;
  public id_team_destination!: number;
  public start_date: string;
  public end_date: string;

  constructor() {
    this.start_date = "";
    this.end_date = "";
  }
}
