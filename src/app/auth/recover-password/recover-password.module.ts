import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecoverPasswordComponent } from './recover-password.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: RecoverPasswordComponent,
  }
];
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RecoverPasswordComponent],
  exports: [RouterModule],
})
export class RecoverPasswordModule { }
