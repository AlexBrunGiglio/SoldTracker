import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { categoriesList } from '../../../environments/constant';
import { TransactionDto } from '../../database/transactions/transaction-dto';
import { UsersService } from '../../database/users/users.service';
import { Share } from '@capacitor/share';

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
    @Input() transactionDetails: TransactionDto;
    transaction = new TransactionDto();
    creationMode = true;
    categories = categoriesList;
    constructor(
        public modalController: ModalController,
        private userService: UsersService,
    ) {
    }
    ngOnInit() {
        console.log("🚀 ~ ModalComponent ~ transactionDetails", this.transactionDetails);
        if (this.transactionDetails) {
            this.transaction = this.transactionDetails;
            this.creationMode = false;
        }
    }

    dismiss() {
        this.modalController.dismiss(ModalComponent);
    }

    async save() {
        if (!this.transaction) {
            return;
        }
        const currentuser = await this.userService.getCurrentUser();
        if (!currentuser.transactions) {
            currentuser.transactions = [];
        }
        await this.userService.addTransactionOnUser(currentuser, this.transaction);
        const userAfterSave = await this.userService.getCurrentUser();
        this.dismiss();
    }

    startEditMode() {
        this.creationMode = true;
    }

    async remove() {
        if (!this.transaction) {
            this.dismiss();
        }
        const currentuser = await this.userService.getCurrentUser();
        await this.userService.removeTransactionOnUser(currentuser, this.transaction);
        this.dismiss();
    }

    async shareTransaction() {
        const share = await Share.share({
            title: 'Je vous partage ma dépense :',
            text: 'Voici ma dépense de ' + this.transaction.label.toLowerCase() + ' d\'une valeur de ' + this.transaction.value + '€. J\'utilise SoldTracker, tu devrais l\'utiliser toi aussi ! 🚀',
        });
    }
}
