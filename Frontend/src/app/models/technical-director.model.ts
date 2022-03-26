export class TechnicalDirector {
  public id!: number;
  public name: string;
  public lastname: string;
  public birth_date: string;
  public status: number;
  public photo!: string;
  public id_country: number;

  public country!: string;
  public id_team!: number;
  public name_team!: string;

  constructor() {
    this.name = "";
    this.lastname = "";
    this.birth_date = "";
    this.status = 0;
    this.id_country = 0;
  }
}
