export class User {
  public id!: number;
  public name: string;
  public lastname: string;
  public password?: string;
  public email: string;
  public phone: string;
  public photo!: string;
  public gender: string;
  public birth_date: string;
  public address: string;
  public id_country: number;

  public id_gender: any;
  public id_rol: number;
  public id_status: number;
  public age: number;
  public nationality?: string;
  public count?: number;
  public amount?: number

  constructor() {
    this.name = "";
    this.lastname = "";
    this.password = "";
    this.email = "";
    this.phone = "";
    this.gender = "";
    this.birth_date = "";
    this.address = "";

    this.id_gender = 0;
    this.id_country = 0;
    this.id_rol = 3;
    this.id_status = 0;
    this.age = 0;
  }
}
