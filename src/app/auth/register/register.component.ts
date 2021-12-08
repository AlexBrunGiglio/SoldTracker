import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDto, UserLogin } from '../../../core/database/users/user-dto';
import { UsersService } from '../../../core/database/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  user: UserLogin = new UserLogin();
  loading = false;
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
      await this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
      const auth = await getAuth();
      this.user.uid = auth.currentUser.uid;
      this.user.password = null;
      this.user.email = null;
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
