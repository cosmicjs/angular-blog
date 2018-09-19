import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthGuard implements CanActivate {
  x;
  constructor(
    private router: Router,
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url = state.url;
    const params = <any>route.queryParams;
    var jsondata = JSON.parse(localStorage.getItem('user'));
    if (jsondata == null) {
      
      this.router.navigate(['login']);
      return new BehaviorSubject<boolean>(false);
    } else {
      
      return new BehaviorSubject<boolean>(true);
    }
  }
}
