import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // понимаю сложность данного middleware, был вариант так же разнести на два guard данную логику
    if (route.url[0]?.path === 'login') {
      if (this.auth.isAuthenticated()) {
        this.router.navigate(['/users'])
        return false;
      } else {
        return true;
      }
    } else {
      if (this.auth.isAuthenticated()) {
        return true;
      } else {
        this.auth.logout()
        this.router.navigate(['/login'])
        return false;
      }
    }
  }
}
