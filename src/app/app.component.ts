import { Component, OnInit } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';
import { getAuth, onAuthStateChanged, provideAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { setDoc, doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import 'firebase/firestore';
import { UsersService } from '../core/database/users/users.service';
import { CategoriesType } from '../environments/constant';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private db: Firestore,
    private userService: UsersService,
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
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

  async ngOnInit() {
    const platform = Capacitor.getPlatform();
    if (platform !== 'web') {
      StatusBar.setBackgroundColor({ color: '#ffee95' });
    }
  }
}
