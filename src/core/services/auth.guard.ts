import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { routesList } from '../../environments/routes';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    routesList = routesList;
    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) { }

    async canActivate(): Promise<boolean> {
        let isAuth = true;
        const getAuthValue = await getAuth();
        if (!getAuthValue.currentUser) {
            isAuth = false;
            this.router.navigate(['/' + routesList.login]);
        }
        else {
            isAuth = true;
        }
        return isAuth;
    }
}
