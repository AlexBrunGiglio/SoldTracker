import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { UserDto } from '../../core/database/users/user-dto';

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
  constructor(
    private db: Firestore,
  ) { }

  async ngOnInit() {
    const auth = await getAuth();
    const unsub = onSnapshot(doc(this.db, 'users', auth.currentUser.uid), (document) => {
      this.user = document.data() as UserDto;
      this.getUserStats();
    });
  }

  getUserStats() {
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
  }
}
