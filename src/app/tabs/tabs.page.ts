import { Component } from '@angular/core';
import { routesList } from '../../environments/routes';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  routesList = routesList;
  constructor() { }

}
