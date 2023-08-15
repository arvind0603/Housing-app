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

  constructor(private http:HttpClient) { }

    getAllProperties(SellRent: number): Observable<Ipropertybase[]>{
      return this.http.get<{ [key: string]: Ipropertybase }>('data/properties.json').pipe(
        map(data => {
          const propertiesArray: Ipropertybase[] = [];

          for(const id in data){
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent){
              propertiesArray.push(data[id]);
            }
          }

          return propertiesArray;

        })
      );
      
   }

   addProperty(property: Property){
    localStorage.setItem('newProp', JSON.stringify(property));
   }
}

