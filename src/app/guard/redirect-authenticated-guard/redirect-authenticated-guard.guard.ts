import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthenticatedGuardGuard implements CanActivate {
  constructor(private readonly angularFireAuth: AngularFireAuth, private readonly router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    if (await this.angularFireAuth.currentUser) {
      await this.router.navigate(['home'])
      return false
    } else {
      return true
    }
  }

}
