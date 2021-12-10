import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { routesList } from '../environments/routes';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: routesList.login,
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: routesList.register,
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: routesList.recoverPassword,
    loadChildren: () => import('./auth/recover-password/recover-password.module').then(m => m.RecoverPasswordModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
