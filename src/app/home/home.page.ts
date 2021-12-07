import { Component } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { UsersService } from '../../core/database/users/users.service';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { UserDto } from '../../core/database/users/user-dto';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: AngularFirestoreDocument<any>;
  userName: string;
  user: UserDto;
  constructor(
    public modalController: ModalController,
    private userService: UsersService,
    private db: Firestore,
  ) {
    this.init();
  }

  async init() {
    const auth = await getAuth();
    this.user = await this.userService.findOne(auth.currentUser.uid);
  }

  async presentTransactionModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
