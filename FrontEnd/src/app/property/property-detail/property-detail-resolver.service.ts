import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private housingService: HousingService, private router: Router) { }

resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> | Property{
  const id = router.params['id'];
  return this.housingService.getProperty(+id).pipe(
    catchError(Error => {
      this.router.navigate(['/']);
      return of(new Property());
    })) as Observable<Property>;
}

}
