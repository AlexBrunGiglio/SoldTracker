import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import 'firebase/firestore'; import { routesList } from '../environments/routes';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  routesList = routesList;
  constructor(
    private router: Router,
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        if (!uid) {
          this.router.navigateByUrl('/' + routesList.login);
        }
        else {
          this.router.navigateByUrl('/' + routesList.tabs + '/' + routesList.home);
        }
      } else {
        this.router.navigateByUrl('/' + routesList.login);
      }
    });
    auth.useDeviceLanguage();
  }

  async ngOnInit() {
    const platform = await Capacitor.getPlatform();
    if (platform !== 'web') {
      StatusBar.setBackgroundColor({ color: '#ffee95' });
    }

    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }
}
