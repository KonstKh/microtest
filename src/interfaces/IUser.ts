
export interface IUser {
  _id: string,
  active: boolean,
  email: string,
  password: string,
  phone: string,
  username: string
}

export interface IUserDTO {
  active: boolean;
  email: string;
  password: string;
  phone: string;
  username: string;
}
