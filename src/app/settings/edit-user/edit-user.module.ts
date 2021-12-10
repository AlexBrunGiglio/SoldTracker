import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditUserPage } from './edit-user.page';

const routes: Routes = [
    {
        path: '',
        component: EditUserPage,
    }
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [EditUserPage],
    exports: [RouterModule]
})
export class EditUserModule { }
