import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    const platform = Capacitor.getPlatform();
    if (platform !== 'web') {
      StatusBar.setBackgroundColor({ color: '#ffee95' });
    }

  }

}
