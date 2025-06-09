export interface IAuthResponse{
    name: string;
    email: string;
    phoneno: string;
}

export interface IAuthFailure{
    [key : string] : Array<string>;
}

export interface IAuthSlice{
    isLoading:boolean;
    isAuthenticated:boolean;
    auth: IAuthResponse;
    error:IAuthFailure;
}