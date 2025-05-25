export interface IRegisterBody {
  firstname: string;
  lastname: string;
  contact_no: string;
  password: string;
}

export interface IForgotUserPasswordBody {
  contact_no: string;
}
