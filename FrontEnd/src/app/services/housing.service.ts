import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty';
import { Observable } from 'rxjs';
import { Ipropertybase } from '../models/ipropertybase';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  baseUrl = 'http://localhost:5009/api';

  constructor(private http: HttpClient) { }

  performApiRequest() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('http://localhost:5009/api/city/cities', httpOptions);
  }

  getAllCities(): Observable<string[]> {
    return this.performApiRequest().pipe(
      // Assuming the response is an array of strings
      map((response: any) => response as string[])
    );
  }

  getProperty(id: number) {
    return this.getAllProperties(1).pipe(
      map(propertiesArray => {
        // throw new Error('Some Error.');
        return propertiesArray.find(property => property.id === id) as Property;
      }
      )
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl + '/property/list/' + SellRent?.toString());
  }



  addProperty(property: Property) {
    let newProps = [property];
    const newProp = localStorage.getItem('newProp')

    // Add new property in array if newProp already exists in local storage
    if (newProp) {
      newProps = [property, ...JSON.parse(newProp)];
    }
    localStorage.setItem('newProp', JSON.stringify(newProps));
  }

  newPropId() {
    if (localStorage && localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(Number(localStorage.getItem('PID')) + 1));
      return Number(localStorage.getItem('PID'));
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }




}

