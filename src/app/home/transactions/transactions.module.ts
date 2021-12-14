import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TransactionsPage } from './transactions.page';

const routes: Routes = [
    {
        path: '',
        component: TransactionsPage,
    }
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [TransactionsPage],
    exports: [RouterModule],
})
export class TransactionsModule { }
