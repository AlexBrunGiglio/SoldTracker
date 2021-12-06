import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserDto } from '../../../core/database/users/user-dto';
import { UsersService } from '../../../core/database/users/users.service';
import { accessToken } from '../../../environments/constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  user: UserDto = new UserDto();
  loading = false;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
  ) { }

  async ngOnInit() {

  }

  async createNewUser() {
    this.loading = true;
    await this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(async (value) => {
      await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(async () => {
          this.loading = false;
          this.router.navigateByUrl('/tabs/home');
        }, async (error) => {
          const alert = await this.alertCtrl.create({
            animated: true,
            message: error.message,
            translucent: true,
            mode: 'ios'
          });
          await alert.present();
        });
    }, async (error) => {
      const alert = await this.alertCtrl.create({
        animated: true,
        message: error.message,
        translucent: true,
        id: 'ErrorLogin',
        mode: 'ios'
      });
      await alert.present();
    });
    this.loading = false;
  }
}
