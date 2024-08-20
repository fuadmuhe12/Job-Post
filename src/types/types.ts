export interface RequestData {
  success: boolean;
  message: string;
  data: Data;
  errors?: string;
  count: number;
}

export interface Data {
  id: string;
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  profilePicUrl: string;
  role: string;
  profileComplete: boolean;
  profileStatus: string;
}

export type sinupInputIds = {
    fullname: string;
    mainPassword: string;
    confirmPass: string;
    emailaddress: string;
  }