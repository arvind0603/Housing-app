import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty';
import { ActivatedRoute } from '@angular/router';
import { Ipropertybase } from 'src/app/models/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit{
  SellRent = 1;
  properties: Array<Ipropertybase> = [];
  City: string = "";
  SearchCity: string = "";
  SortbyParam: string = "";
  SortDirection: string = "asc";

  constructor(private route: ActivatedRoute, private housingService: HousingService) {  }
  ngOnInit(): void {

    if (this.route.snapshot.url.toString()){
      this.SellRent = 2
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.properties = data;
        // const localProp = localStorage.getItem('newProp');
        // if (localProp){
        //   const newProperty = JSON.parse(localProp);
        //   if(newProperty && newProperty.SellRent === this.SellRent){
        //   this.properties = [newProperty, ...this.properties];
        //   }
        // }

        console.log("Property-list-component")
        console.log(data);

      }, error=>{
        console.error(error)
      }
      
    )

  }

  onCityFilter() {
    this.SearchCity = this.City
  }
  onCityFilterClear() {
    this.SearchCity = ""
    this.City = ""
  }

  onSortDirection() {
    if(this.SortDirection === "asc"){
      this.SortDirection = "desc"
    } else {
      this.SortDirection = "asc"
    }
  }
}