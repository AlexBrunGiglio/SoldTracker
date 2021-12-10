import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserLogin } from '../../../core/database/users/user-dto';
import { Storage } from '@capacitor/storage';
import { routesList } from '../../../environments/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  user: UserLogin = new UserLogin();
  loading = false;
  routesList = routesList;
  constructor(
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private router: Router
  ) {
  }

  async ngOnInit() {
    // const auth = await getAuth();
    // const token = await auth.currentUser.getIdToken();
    // if (token) {
    //   this.router.navigateByUrl('/tabs/home');
    // }
    const value = await Storage.get({ key: 'uid' });
    if (value) {
      this.router.navigateByUrl('/' + routesList.tabs + '/' + routesList.home);
    }
  }

  async signIn() {
    this.loading = true;
    if (!this.user.email || !this.user.password) {
      this.loading = false;
      return;
    }
    try {
      const login = await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
      await Storage.set({
        key: 'uid',
        value: (await this.afAuth.currentUser).uid,
      });
      this.router.navigateByUrl('/' + routesList.tabs + '/' + routesList.home);
    } catch (error) {
      const alert = await this.alertCtrl.create({
        animated: true,
        message: error.message,
        translucent: true,
        mode: 'ios'
      });
      await alert.present();
    }
    this.loading = false;
  }
}
