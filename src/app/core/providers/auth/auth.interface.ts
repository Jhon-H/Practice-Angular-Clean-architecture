export interface AuthUser {
  username: string;
  password: string;
}

export interface NewAuthUser {
  username: string;
  email: string;
  password: string;
  picture: string;
  name: string;
}
