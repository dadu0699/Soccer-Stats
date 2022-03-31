export class Team {
  public id!: number;
  public name: string;
  public foundation_date: string;
  public photo: string;
  public id_country: number;

  public country!: string;
  public competition!: string;
  public id_team?: number;
  public team?: string;


  constructor() {
    this.name = "";
    this.foundation_date = "";
    this.photo = "";
    this.id_country = 0;
  }
}
