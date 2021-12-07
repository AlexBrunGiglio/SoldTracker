import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
  ) { }

  ngOnInit() {

  }

  async logout() {
    try {
      const auth = getAuth();
      const signout = await signOut(auth);
      this.router.navigateByUrl('/login');
    } catch (error) {
      const alert = await this.alertCtrl.create({
        animated: true,
        message: error.message,
        translucent: true,
        mode: 'ios'
      });
      await alert.present();
    }
  }
}
