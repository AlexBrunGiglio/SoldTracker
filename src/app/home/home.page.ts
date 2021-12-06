import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../core/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    public modalController: ModalController,
  ) { }

  async presentTransactionModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }
}
