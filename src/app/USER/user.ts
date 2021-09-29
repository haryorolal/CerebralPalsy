import { role } from '../Auth/role.enum';


export interface IUser{
    id: number;
    FirstName: string
    LastName: string
    UserName: string
    Role: string
    exp: Date;
    nbf: string;
    iat: Date;
}
export interface NUser{
    id: number;
    FirstName: string
    LastName: string
    UserName: string
    Password: string
    Role: string
}

export interface JwtModel {
    exp: Date;
    nbf: string;
    iat: Date;
    isValid: boolean;
    refreshToken: string;
    token: string;
}



export class User implements NUser{
    constructor(
        public id = null,
        public FirstName = '',
        public LastName = '',
        public UserName = '',
        public Password = '',
        //public Role = role.None
        public Role = null
    ){}

    static BuildUser(user: NUser){
        return new User(
            user.id,
            user.FirstName,
            user.LastName,
            user.UserName,
            user.Password,
            user.Role
        )
    }
}

