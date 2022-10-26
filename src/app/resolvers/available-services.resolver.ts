import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AvailabeService } from '../model/availabe-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvailableServicesResolver implements Resolve<AvailabeService[]> {

  resolve(route: ActivatedRouteSnapshot): Observable<AvailabeService[]> {
    return of([
      { id: 1, name: 'Priority', price: 5 },
      { id: 1, name: 'Registered', price: 7 },
      { id: 1, name: 'Sign required', price: 11 },
    ]);
  }

}
