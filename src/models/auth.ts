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
  region: string,
  state: string,
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

export interface IGenderParams {
  label: string,
  value: string,
}

export interface ILocationParams {
  id: string | number,
  name: string,
  pid?: number | null,
}
export interface ILocationValidation {
  region: string | number,
  state: string | number,
}