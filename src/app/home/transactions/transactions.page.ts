import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { TransactionDto } from '../../../core/database/transactions/transaction-dto';
import { UserDto } from '../../../core/database/users/user-dto';
import { UsersService } from '../../../core/database/users/users.service';
import { MonthList } from '../../../environments/constant';

interface MonthTransactionsWrapper {
    monthName: string;
    monthNumberValue?: number;
    transactions?: TransactionDto[];
}

interface YearTransactionsWrapper {
    monthTransactions: MonthTransactionsWrapper[];
    yearValue?: number;
}
@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.page.html',
    styleUrls: ['./transactions.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TransactionsPage implements OnInit {
    yearsTransactions: YearTransactionsWrapper[] = [];
    auth: Auth;
    user: UserDto;
    constructor(
        private db: Firestore,
        private userService: UsersService,
        private router: Router,
    ) {

    }

    async ngOnInit() {
        this.auth = await getAuth();
        const unsub = onSnapshot(doc(this.db, 'users', this.auth.currentUser.uid), (document) => {
            this.user = document.data() as UserDto;
            for (const transaction of this.user.transactions) {
                transaction.date = this.setUserTransactionDate(transaction.date);
            }
            this.setMonthTransactionWrapper();
        });
    }

    setUserTransactionDate(dbDate: any): Date {
        return new Date(dbDate);
    }

    async setMonthTransactionWrapper() {
        this.createYearWrapper();
        for (const year of this.yearsTransactions) {
            for (const month of year.monthTransactions) {
                month.transactions = [...this.user.transactions.filter(x => x.date && x.date.getFullYear() === year.yearValue && x.date.getMonth() === month.monthNumberValue)];
            }
        }
    }

    private createYearWrapper() {
        this.yearsTransactions = [];
        const thisYear = new Date().getFullYear();

        for (let index = thisYear - 3; index <= thisYear; index++) {
            const monthTransactions = [];
            for (const month of MonthList) {
                monthTransactions.push({ monthName: month.label, monthNumberValue: month.value, transactions: [] });
            }

            this.yearsTransactions.push({ monthTransactions, yearValue: index });
        }
        this.yearsTransactions.sort((a, b) => b.yearValue - a.yearValue);
    }
}
