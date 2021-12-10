import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDto, UserLogin } from '../../../core/database/users/user-dto';
import { UsersService } from '../../../core/database/users/users.service';
import { routesList } from '../../../environments/routes';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  user: UserDto = new UserDto();
  userLogin: UserLogin = new UserLogin();
  loading = false;
  routesList = routesList;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private userService: UsersService,
    private db: AngularFirestore,
  ) { }

  async ngOnInit() {

  }

  async createNewUser() {
    this.loading = true;
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.userLogin.email, this.userLogin.password);
      await this.afAuth.signInWithEmailAndPassword(this.userLogin.email, this.userLogin.password);
      const auth = await getAuth();
      this.user.uid = auth.currentUser.uid;
      this.userLogin.password = null;
      this.userLogin.email = null;
      // this.user.lastPaidDate = (Date.parse(new Date().toISOString()) / 1000) as unknown as Timestamp;
      // this.user.paidDay = new Date().getDay();
      this.user.transactions = [];
      this.user.solde = 0;
      this.user.salary = 0;
      await this.userService.create(this.user);
    }
    catch (err) {
      const alert = await this.alertCtrl.create({
        animated: true,
        message: err.message,
        translucent: true,
        mode: 'ios'
      });
      await alert.present();
    }
    this.loading = false;
  }
}
