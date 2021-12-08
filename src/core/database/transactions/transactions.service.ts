import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { TransactionDto } from './transaction-dto';
import { UsersService } from '../users/users.service';
@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    transactionsRef: AngularFirestoreCollection<TransactionDto> = null;
    private dbPath = '/transactions';

    constructor(
        public db: AngularFirestore,
        private userService: UsersService,
    ) {
        this.transactionsRef = db.collection(this.dbPath);
    }

    async getAllFromUser(): Promise<TransactionDto[]> {
        let transactions: TransactionDto[] = [];
        const user = await this.userService.getCurrentUser();
        transactions = user.transactions;
        return transactions;
    }

    async findOneFromUser(transactionId: string): Promise<TransactionDto> {
        let transaction = new TransactionDto();
        const user = await this.userService.getCurrentUser();
        transaction = user.transactions?.find(x => x.id === transactionId);
        return transaction;
    }
}
