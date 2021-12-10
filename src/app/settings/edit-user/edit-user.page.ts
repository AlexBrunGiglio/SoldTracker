import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { deleteUser, getAuth, updateEmail, updatePassword, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserDto, UserLogin } from '../../../core/database/users/user-dto';
import { UsersService } from '../../../core/database/users/users.service';
import { routesList } from '../../../environments/routes';
@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.page.html',
    styleUrls: ['./edit-user.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EditUserPage implements OnInit {
    user: UserDto = {} as any;
    loading = false;
    routesList = routesList;
    currentUser: User;
    newPassword: string;
    changePassword = false;
    emailHasBeenEdited = false;
    userEmail = '';
    auth: Auth;
    dateToSet: Date;
    constructor(
        private db: Firestore,
        private userService: UsersService,
        private router: Router,
        private afAuth: AngularFireAuth,
    ) {

    }

    async ngOnInit() {
        this.auth = await getAuth();
        const unsub = onSnapshot(doc(this.db, 'users', this.auth.currentUser.uid), (document) => {
            this.currentUser = this.auth.currentUser;
            this.user = document.data() as UserLogin;
            this.userEmail = this.auth.currentUser?.email;
        });
    }

    async save() {
        await this.updateMyUserProfileData();
        if (this.emailHasBeenEdited) {
            await this.updateMyUserLoginData();
        }
        if (this.changePassword) {
            await this.updateMyPassword();
        }
        this.router.navigateByUrl('/' + routesList.tabs + '/' + routesList.settings);
    }

    async updateMyUserProfileData() {
        await this.userService.create(this.user);
    }

    async updateMyUserLoginData() {
        // this.afAuth.signInWithPopup(this.afAuth.sendPasswordResetEmail)
        await updateEmail(this.currentUser, this.userEmail);
    }

    async updateMyPassword() {
        await updatePassword(this.currentUser, this.newPassword);
    }

    changePasswordMode() {
        this.changePassword = true;
    }

    async removeMyAccount() {
        await this.userService.delete(this.currentUser.uid);
        await deleteUser(this.currentUser);
        this.router.navigateByUrl('/' + routesList.register);
    }
}
