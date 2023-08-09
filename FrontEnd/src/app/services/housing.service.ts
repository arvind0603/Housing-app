import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

    getAllProperties(SellRent: number): Observable<IProperty[]>{
      return this.http.get<{ [key: string]: IProperty }>('data/properties.json').pipe(
        map(data => {
          const propertiesArray: IProperty[] = [];

          for(const id in data){
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent){
              propertiesArray.push(data[id]);
            }
          }

          return propertiesArray;

        })
      );
      
   }
}

