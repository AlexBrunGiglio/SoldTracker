import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { CategoryDto } from '../../core/database/categories/category-dto';
import { TransactionDto } from '../../core/database/transactions/transaction-dto';
import { UserDto } from '../../core/database/users/user-dto';
import { categoriesList } from '../../environments/constant';

interface StatistiqueWrapper {
  category: CategoryDto;
  transactions: TransactionDto[];
  totalPrice?: number;
  percentage?: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatsPage implements OnInit {
  user: UserDto;
  negativesOperations = 0;
  positivesOperations = 0;
  categories = categoriesList;
  statWrapper: StatistiqueWrapper[] = [];
  constructor(
    private db: Firestore,
  ) { }

  async ngOnInit() {
    const auth = await getAuth();
    const unsub = onSnapshot(doc(this.db, 'users', auth.currentUser.uid), (document) => {
      this.user = document.data() as UserDto;
      this.statWrapper = [];
      this.getUserStats();
    });
  }

  async getUserStats() {
    let totalTransactions = 0;
    if (!this.user) {
      return;
    }
    const neg = this.user.transactions.filter(x => x.value < 0);
    for (const item of neg) {
      this.negativesOperations += item.value;
    }
    const pos = this.user.transactions.filter(x => x.value > 0);
    for (const item of pos) {
      this.positivesOperations += item.value;
    }
    for (const cat of categoriesList) {
      this.statWrapper.push({ category: cat, transactions: [], percentage: 0, totalPrice: 0 });
    }
    for (const statWrapper of this.statWrapper) {
      const filteredTransactions = this.user.transactions.filter(x => x.categorie.code === statWrapper.category.code);
      statWrapper.transactions = filteredTransactions;
      for (const stat of statWrapper.transactions) {
        statWrapper.totalPrice += stat.value;
      }
      statWrapper.totalPrice = Math.abs(statWrapper.totalPrice);
      totalTransactions += statWrapper.totalPrice;
    }
    this.statWrapper.forEach((stat) => {
      stat.percentage = (stat.totalPrice / totalTransactions);
    });

    // const index = this.statWrapper.findIndex(y => y.totalPrice === 0);
    // if (index !== -1) {
    //   this.statWrapper.splice(index, 1);
    // }
    this.statWrapper.sort((a, b) => b.totalPrice - a.totalPrice);
  }
}
