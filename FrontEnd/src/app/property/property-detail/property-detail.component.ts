import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public propertyId!: number;
  property = new Property();

  constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.params['id']);

    this.route.data.subscribe(
      (data) => {
        this.property = data['prp'];
        console.log(this.property.photos);
      });

    if (this.property.estPossessionOn) {
      this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);
    }


    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id']
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data) => {
    //         if (data) {
    //           this.property = data;

    //         }
    //       }
    //     ), (error: any) => this.router.navigate(['/'])

    // }
    // )
  }

}
