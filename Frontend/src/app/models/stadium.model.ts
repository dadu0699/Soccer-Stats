export class Stadium {
  public id!: number;
  public name: string;
  public foundation_date: string;
  public capacity: number;
  public id_country: number;
  public address: string;
  public state: number;
  public photo: string;

  public country!: string;

  constructor() {
    this.name = "";
    this.foundation_date = "";
    this.capacity = 0;
    this.id_country = 0;
    this.address = "";
    this.state = 0;
    this.photo = "";
  }
}
