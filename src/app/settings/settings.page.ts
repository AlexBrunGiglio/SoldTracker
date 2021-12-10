import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BatteryInfo, Device, DeviceInfo } from '@capacitor/device';
import { routesList } from '../../environments/routes';
import { UsersService } from '../../core/database/users/users.service';
import { Firestore } from '@angular/fire/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserDto } from '../../core/database/users/user-dto';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPage implements OnInit {
  batteryInfo: BatteryInfo;
  deviceInfo: DeviceInfo;
  routesList = routesList;
  user: UserDto;
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    private db: Firestore,
  ) { }

  async ngOnInit() {
    this.deviceInfo = await Device.getInfo();
    this.batteryInfo = await Device.getBatteryInfo();
    const auth = await getAuth();
    const unsub = onSnapshot(doc(this.db, 'users', auth.currentUser.uid), (document) => {
      this.user = document.data() as UserDto;
    });
  }

  async logout() {
    try {
      const auth = getAuth();
      const signout = await signOut(auth);
      this.router.navigateByUrl('/' + routesList.login);
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
