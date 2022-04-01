export class Game {
  public id!: number;
  public game_date: string;
  public attendees: number;
  public result_local: number;
  public result_visiting: number;
  public status: number;
  public id_stadium: number;
  public id_team_local: number;
  public id_team_visiting: number;
  public id_competition: number;

  public stadium!: string;
  public team_local!: string;
  public team_visiting!: string;
  public competition!: string;
  public photo_local?: string;
  public photo_visiting?: string;

  constructor() {
    this.game_date = "";
    this.attendees = 0;
    this.result_local = 0;
    this.result_visiting = 0;
    this.status = 0;
    this.id_stadium = 0;
    this.id_team_local = 0;
    this.id_team_visiting = 0;
    this.id_competition = 0;
  }
}
