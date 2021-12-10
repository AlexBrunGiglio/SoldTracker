import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/services/auth.guard';
import { routesList } from '../../environments/routes';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: routesList.tabs,
    component: TabsPage,
    children: [
      {
        path: routesList.home,
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: routesList.stats,
        loadChildren: () => import('../statistics/stats.module').then(m => m.StatsModule)
      },
      {
        path: routesList.settings,
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: routesList.editUser,
        loadChildren: () => import('../settings/edit-user/edit-user.module').then(m => m.EditUserModule)
      },
      {
        path: '',
        redirectTo: '/' + routesList.tabs + '/' + routesList.home,
        pathMatch: 'full'
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/' + routesList.tabs + '/' + routesList.home,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
