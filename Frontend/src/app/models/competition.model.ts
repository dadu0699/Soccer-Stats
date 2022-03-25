export class Competition {
  public id!: number;
  public name: string;
  public type: number;
  public year: number;
  public id_country: number;

  public country!: string;
  public id_champion_team!: number;
  public champion_team!: string;

  constructor() {
    this.name = "";
    this.type = 0;
    this.year = 0;
    this.id_country = 0;
  }
}
