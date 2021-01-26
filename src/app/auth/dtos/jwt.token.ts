export class JwtPayload {
  email: string;
  sub: number;
}

export class JwtAccesstoken {
  access_token: string;
  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
