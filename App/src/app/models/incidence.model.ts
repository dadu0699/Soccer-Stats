export class Incidence {
  public id_player!: number;
  public id_game!: number;
  public type!: number;
  public description: string;
  public minute!: number;

  constructor() {
    this.description = "";
  }
}
