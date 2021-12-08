import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BatteryInfo, Device, DeviceInfo } from '@capacitor/device';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPage implements OnInit {
  batteryInfo: BatteryInfo;
  deviceInfo: DeviceInfo;
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
  ) { }

  async ngOnInit() {
    this.deviceInfo = await Device.getInfo();
    this.batteryInfo = await Device.getBatteryInfo();
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
