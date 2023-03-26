import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthServiceService} from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loginStr = localStorage.getItem('loggedIn') || 'false'
    const login = loginStr.toLowerCase() === 'true'

    if (!login) {
      this.router.navigateByUrl('/login');
    }

    return login
  }

}
