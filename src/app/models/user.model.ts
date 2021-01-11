export class User {
  constructor(
    private email: string,
    private token: string,
    private firstname:string,
    private lastname:string,
  ) {}


  get userToken() {
    return this.token;
  }
}
