import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Ikeyvaluepair } from 'src/app/models/ikeyvaluepair';
import { Ipropertybase } from 'src/app/models/ipropertybase';
import { Property } from 'src/app/models/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm: NgForm | undefined;
  @ViewChild('formTabs')
  formTabs!: TabsetComponent;

  addPropertyForm!: FormGroup;
  NextClicked: boolean = false;
  property = new Property();

  propertyTypes!: Ikeyvaluepair[];
  furnishTypes!: Ikeyvaluepair[];
  cityList: any[] = [];

  propertyView: Ipropertybase = {
    id: null,
    sellRent: null,
    name: '',
    furnishingType: null,
    price: null,
    propertyType: null,
    bhk: null,
    builtArea: null,
    city: "",
    readyToMove: null,
  };

  constructor(
    private datePipe: DatePipe,
    private route: Router,
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe((data) => {
      this.cityList = data;
      console.log(data);
    });

    this.housingService.getPropertyTypes().subscribe((data) => {
      this.propertyTypes = data;
    });

    this.housingService.getFurnishingTypes().subscribe((data) => {
      this.furnishTypes = data;
    });

    // this.propertyView.estPossessionOn = new Date();
  }

  parseDate(dateString: string | undefined): Date | undefined {
    if (dateString) {
      return new Date(dateString);
    } else {
      return undefined;
    }
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      }),
    });
  }

  // #region <Getter Methods>
  get BasicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }
  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }
  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }
  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }
  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }
  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }
  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }
  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }
  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }
  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }
  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }
  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }
  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }
  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }
  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }
  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }
  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }
  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }
  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }
  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }

  onBack() {
    this.route.navigate(['/']);
  }
  onSubmit() {
    this.NextClicked = true;
    if (this.allTabsValid()) {
      console.log(this.addPropertyForm);
      this.mapProperty();
      this.housingService.addProperty(this.property).subscribe(
        () => {
          this.alertify.success('Congrats! your property listed on our website!');
          // console.log("sell rent: " + this.addPropertyForm.value.BasicInfo.SellRent)
          if (this.SellRent.value == 1) {
            this.route.navigate(['/']);
          } else {
            this.route.navigate(['/rent-property']);
          }
        }
      );
    } else {
      this.alertify.error('Please review and fill out all the fields!');
      console.log(this.addPropertyForm);
    }
  }

  mapProperty(): void {
    this.property.id = this.housingService.newPropId();
    this.property.sellRent = +this.SellRent.value;
    this.property.bhk = this.BHK.value;
    this.property.propertyTypeId = this.PType.value;
    this.property.name = this.Name.value;
    this.property.cityId = this.City.value;
    this.property.furnishingTypeId = this.FType.value;
    this.property.price = this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = this.BuiltArea.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.readyToMove = this.RTM.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.estPossessionOn = this.datePipe.transform(this.PossessionOn.value, 'mm/dd/yyyy');
    this.property.description = this.Description.value;
  }




  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }

    return true;
  }

  selectTab(tabId: number, isCurrentTabValid?: boolean) {
    this.NextClicked = true;
    if (isCurrentTabValid) {
      if (this.formTabs.tabs[tabId]) {
        this.formTabs.tabs[tabId].active = true;
        this.NextClicked = false;
        console.log('Tab Selected ' + tabId);
      }
    }
  }
}
