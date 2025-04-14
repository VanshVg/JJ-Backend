export interface IRegisterBody {
  contact_no: string;
  password: string;
}

export interface IVerifyOtpBody {
  contact_no: string;
  otp: string;
}
