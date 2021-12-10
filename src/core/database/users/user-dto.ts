import { Timestamp } from 'firebase/firestore';
import { TransactionDto } from '../transactions/transaction-dto';

export class UserDto {
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    solde: number;
    uid: string;
    transactions: TransactionDto[];
    gender?: 'h' | 'f';
    salary: number;
    paidDay: number;
    lastPaidDate: Timestamp;
}

export class UserLogin extends UserDto {
    email: string;
    password: string;
}
