import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:30171/api/city');
  }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        // throw new Error('Some Error.');
        return propertiesArray.find(property => property.Id === id) as Property;
      }
      )
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<{ [key: string]: Property }>('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Property[] = [];
        const localProp = localStorage.getItem('newProp');
        if (localProp) {
          const localProperties = JSON.parse(localProp);
          if (localProperties) {
            for (const id in localProperties) {
              console.log(id);
              if (SellRent){
                if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
                  propertiesArray.push(localProperties[id]);
                }
              } else {
                propertiesArray.push(localProperties[id]);
              }

            }
          }
        }


        for (const id in data) {
          if(SellRent){
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          } else {
            propertiesArray.push(data[id]);
          }

        }

        return propertiesArray;

      })
    );

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

