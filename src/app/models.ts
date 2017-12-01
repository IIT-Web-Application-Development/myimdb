export class User {
  constructor(
    public username: string,
    public password: string,
    public full_name?: string,
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

