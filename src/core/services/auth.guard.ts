import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) { }

    async canActivate(): Promise<boolean> {
        let isAuth = true;
        const getAuthValue = await getAuth();
        if (!getAuthValue.currentUser) {
            isAuth = false;
            this.router.navigate(['/login']);
        }
        else {
            isAuth = true;
        }
        return isAuth;
    }
}
