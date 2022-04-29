export class Log {
  public id: number;
  public user_name: string;
  public user_lastname: string;
  public user_photo: string;
  public user_role: number;
  public action: string;
  public date: string;
  public description: string;
  public database_table: string;

  constructor() {
    this.id = 0;
    this.user_name = "";
    this.user_lastname = "";
    this.user_photo = "";
    this.user_role = 1;
    this.action = "";
    this.date = "";
    this.description = "";
    this.database_table = "";
  }
}
