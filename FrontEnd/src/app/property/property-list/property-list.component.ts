import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {

  properties: Array<any> = [

    {
      "Id":1,
      "Name": "Birla House",
      "Type":"House",
      "Price":2000
    },
    {
      "Id":2,
      "Name": "Erose Villa",
      "Type":"Villa",
      "Price":3000
    },
    {
      "Id":3,
      "Name": "DPV",
      "Type":"Apartments",
      "Price":3200
    },
    {
      "Id":4,
      "Name": "Vikas House",
      "Type":"House",
      "Price":2300
    },
    {
      "Id":5,
      "Name": "Lakeshore Villa",
      "Type":"Villa",
      "Price":4400
    },
    {
      "Id":6,
      "Name": "Papillon",
      "Type":"Apartments",
      "Price":4300
    }

  ]

}
