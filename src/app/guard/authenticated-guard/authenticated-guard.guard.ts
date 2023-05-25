import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardGuard implements CanActivate {

  constructor(private readonly angularFireAuth: AngularFireAuth, private readonly router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean >  {
    if(await this.angularFireAuth.currentUser) {
      return true
    }else {
      await this.router.navigate(['login'])
      return false
    }
  }

}
