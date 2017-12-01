export class User {
  constructor(
    public username: string,
    public password: string,
    public name?: string,
    public email?: string,
    public id?: number
  ) { }
}
export class Movie {
  constructor(
    public title: string,
    public description: string,
    public image?: string,
    public id?: number
  ) { }
}
export class Series {
  constructor(
    public title: string,
    public description: string,
    public image?: string,
    public id?: number
  ) { }
}

