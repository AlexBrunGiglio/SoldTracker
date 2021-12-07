export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    solde: number;
    uid: string;
}

export class UserLogin extends UserDto {
    email: string;
    password: string;
}
