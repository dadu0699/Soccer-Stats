export class User {
  public id_user!: number;
  public name: string;
  public lastname: string;
  public password?: string;
  public email: string;
  public phone: string;
  public photo!: string;
  public gender: string;
  public birth_date: string;
  public address: "";
  public id_country: number;

  constructor() {
    this.name = "";
    this.lastname = "";
    this.password = "";
    this.email = "";
    this.phone = "";
    this.photo = "";
    this.gender = "";
    this.birth_date = "";
    this.address = "";
    this.id_country = 0;
  }
}
