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