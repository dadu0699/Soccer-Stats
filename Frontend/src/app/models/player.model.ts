export class Player {
  public id!: number;
  public name: string;
  public lastname: string;
  public birth_date: string;
  public id_nationality: number;
  public position: number;
  public status: number;
  public photo!: string;

  public nationality!: string;
  public id_team!: number;
  public name_team!: string;
  public competition?: string;
  public count?: number;

  constructor() {
    this.name = "";
    this.lastname = "";
    this.birth_date = "";
    this.id_nationality = 0;
    this.position = 0;
    this.status = 0;
  }
}
