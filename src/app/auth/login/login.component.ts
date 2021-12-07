import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDto } from '../../../core/database/users/user-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  user: UserDto = new UserDto();
  loading = false;
  constructor(
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  async signIn() {
    this.loading = true;
    if (!this.user.email || !this.user.password) {
      this.loading = false;
      return;
    }
    try {
      const login = await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
      this.router.navigateByUrl('/tabs/home');
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
