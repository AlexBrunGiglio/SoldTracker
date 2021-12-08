import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { categoriesList } from '../../../environments/constant';
import { TransactionDto } from '../../database/transactions/transaction-dto';

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
    @Input() transaction: TransactionDto;
    creationMode = true;
    categories = categoriesList;
    constructor(
        public modalController: ModalController,
    ) { }

    dismiss() {
        this.modalController.dismiss(ModalComponent);
    }
}
