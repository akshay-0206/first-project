export interface IAuthResponse{
    _id:string;
    name: string;
    email: string;
    phone: string;
    token:string;
}

export interface IAuthFailure{
    [key : string] : Array<string>;
}

export interface IAuthSlice{
    isLoading:boolean;
    isAuthenticated:boolean;
    auth: IAuthResponse;
    error: IAuthFailure | undefined;
}

export interface IUserProfile {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}

export interface IAuthSlice {
  auth: IAuthResponse;
  profile: IUserProfile | null;
  isLoading: boolean;
  error: IAuthFailure | undefined;
  isAuthenticated: boolean;
}

export interface IUserProfile {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}

export interface IAuthSlice {
  auth: IAuthResponse;
  isLoading: boolean;
  error: IAuthFailure | undefined;
  isAuthenticated: boolean;
  profile: IUserProfile | null;
}


