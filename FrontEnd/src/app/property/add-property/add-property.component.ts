import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { from } from 'rxjs';
import { IProperty } from '../IProperty';
import { Ipropertybase } from 'src/app/models/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('Form') addPropertyForm: NgForm | undefined;
  @ViewChild('formTabs') formTabs: TabsetComponent | undefined;

  propertyTypes: Array<string> = ['House', 'Apartments', 'Villas'];
  furnishTypes: Array<string> = ['Fully', 'Semi-Furnished', 'Not Furnished'];

  propertyView: Ipropertybase = {
    Id: null,
    SellRent: null,
    Name: '',
    FType: null,
    Price: null,
    PType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  }

  constructor(private route: Router) { }

  ngOnInit() {
  }

  onBack(){
    this.route.navigate(['/'])
  }
  onSubmit(){
    console.log("Congrats! for submitted")
    console.log(this.addPropertyForm)
  }

  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
      console.log("Tab Selected " + tabId)
    }
  }

}


