import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../core/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  items: AngularFirestoreDocument<any>;
  constructor(
    public modalController: ModalController,
    private firestore: AngularFirestore,
  ) {
    this.init();
  }

  async init() {
  }

  async presentTransactionModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
