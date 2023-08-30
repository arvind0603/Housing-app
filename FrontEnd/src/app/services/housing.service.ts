import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty';
import { Observable } from 'rxjs';
import { Ipropertybase } from '../models/ipropertybase';
import { Property } from '../models/property';
import { Ikeyvaluepair } from '../models/ikeyvaluepair';

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

  getPropertyTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/propertytype/list');
  }

  getFurnishingTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseUrl + '/furnishingtype/list');
  }

  getProperty(id: number) {
    return this.http.get<Property[]>(this.baseUrl + '/property/detail/' + id.toString());
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl + '/property/list/' + SellRent?.toString());
  }



  addProperty(property: Property) {
    return this.http.post(this.baseUrl + '/property/add', property);




    // let newProps = [property];
    // const newProp = localStorage.getItem('newProp')

    // // Add new property in array if newProp already exists in local storage
    // if (newProp) {
    //   newProps = [property, ...JSON.parse(newProp)];
    // }
    // localStorage.setItem('newProp', JSON.stringify(newProps));
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

  getPropertyAge(dateofEstablishment: string): string {
    const today = new Date();
    const estDate = new Date(dateofEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = estDate.getMonth() - estDate.getMonth();

    //Current month smaller than established month or
    //Same month but curr date is smaller than the established date
    if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
      age--;
    }

    //Established date is future date
    if (today < estDate) {
      return '0';
    }

    //Age is less than a year
    if (age === 0) {
      return 'Less than a year';
    }

    return age.toString();
  }




}

