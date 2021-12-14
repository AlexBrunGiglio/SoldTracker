import { Component } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { UsersService } from '../../core/database/users/users.service';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Firestore, onSnapshot, doc } from '@angular/fire/firestore';
import { UserDto } from '../../core/database/users/user-dto';
import { TransactionDto } from '../../core/database/transactions/transaction-dto';
import { MainHelpers } from '../../core/services/main-helper';
import { categoriesList, CategoriesType } from '../../environments/constant';
import { routesList } from '../../environments/routes';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: AngularFirestoreDocument<any>;
  userName: string;
  user: UserDto;
  routesList = routesList;
  loading: HTMLIonLoadingElement;
  constructor(
    public modalController: ModalController,
    private userService: UsersService,
    private db: Firestore,
    private loadingController: LoadingController,
  ) {
    this.init();
  }

  async init() {
    this.loading = await this.loadingController.create({
      message: 'Chargement de vos informations',
    });
    await this.loading.present();
    const auth = await getAuth();
    const unsub = onSnapshot(doc(this.db, 'users', auth.currentUser.uid), (document) => {
      this.user = document.data() as UserDto;
      // this.checkIfSoldeHaveToBeUpdateAndSet();
      this.user?.transactions?.sort((a, b) => MainHelpers.compareDate(b.date, a.date));
    });
    this.loading.dismiss();
  }

  async presentTransactionModal(item?: TransactionDto) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      swipeToClose: true,
      componentProps: {
        transactionDetails: item
      }
    });
    await modal.present();
  }

  async checkIfSoldeHaveToBeUpdateAndSet() {
    const today = new Date();
    if (!this.user) {
      return;
    }
    if (!this.user?.lastPaidDate) {
      this.user.lastPaidDate = new Timestamp(today.getSeconds(), today.getMilliseconds());
      // this.user.lastPaidDate = (Date.parse(today.toString()) / 1000) as unknown as Timestamp;
      await this.userService.create(this.user);
    }
    const compareDateResult = MainHelpers.compareDate(this.user.lastPaidDate.toDate(), today);
    if (this.user.paidDay === today.getUTCDate() && compareDateResult <= 0) {
      const transaction = new TransactionDto();
      console.log('set salary');
      transaction.date = today;
      transaction.label = 'Salaire';
      transaction.value = this.user.salary;
      transaction.categorie = categoriesList.find(x => x.code === CategoriesType.remboursement);
      this.user.lastPaidDate = (Date.parse(today.toISOString()) / 1000) as unknown as Timestamp;
      await this.userService.addTransactionOnUser(this.user, transaction);
    }
  }
}
