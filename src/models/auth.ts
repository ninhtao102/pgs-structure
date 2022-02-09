export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface IRegisterParams {
  email: string,
  password: string,
  repeatPassword: string,
  name: string,
  gender: string,
  region: number,
  state: number,
}

export interface IRegisterValidation {
  email: string,
  password: string,
  repeatPassword: string,
  name: string,
  gender: string,
  region: string | number,
  state: string | number,
}