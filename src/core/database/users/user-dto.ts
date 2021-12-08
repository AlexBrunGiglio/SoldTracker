import { TransactionDto } from '../transactions/transaction-dto';

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    solde: number;
    uid: string;
    transactions: TransactionDto[];
}

export class UserLogin extends UserDto {
    email: string;
    password: string;
}
