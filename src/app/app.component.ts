import { Component, OnInit } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';
import { getAuth, onAuthStateChanged, provideAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import 'firebase/firestore';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (!uid) {
          this.router.navigateByUrl('/login');
        }
        else {
          this.router.navigateByUrl('/tabs/home');
        }
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  ngOnInit() {
    const platform = Capacitor.getPlatform();
    if (platform !== 'web') {
      StatusBar.setBackgroundColor({ color: '#ffee95' });
    }
  }




}
