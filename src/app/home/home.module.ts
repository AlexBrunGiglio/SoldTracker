import { IonicModule, IonItemSliding } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from '../../core/components/modal/modal.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ModalModule,
  ],
  declarations: [HomePage],
  exports: [RouterModule],
})
export class HomeModule { }
