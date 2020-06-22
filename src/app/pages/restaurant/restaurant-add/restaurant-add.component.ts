import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService, NbDialogService } from '@nebular/theme';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RestaurantService } from '../../../shared/services/restaurant.service';

@Component({
  selector: 'ngx-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.scss']
})
export class RestaurantAddComponent implements OnInit, OnDestroy {
  destroySubject: Subject<void>  = new Subject();

  restaurantForm: FormGroup;

  userSettings = {}



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: NbToastrService,
    private ngxLoader: NgxUiLoaderService,
    private restaurantServe: RestaurantService
  ) { }

  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      restaurantName: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      restaurantDescription: ['', Validators.compose([ Validators.required])],
      restaurantContactNo: ['', Validators.compose([Validators.required])],
      restaurantLogo: ['', Validators.compose([Validators.required])],
      restaurantBanner: ['', Validators.compose([Validators.required,])],
      email:  ['', [Validators.required, emailValid()]],
      address: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      password :          ['', [Validators.required, Validators.minLength(8)]],
      confirm_password :  ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: matchingFields('password', 'confirm_password') });;

    this.restaurantForm.patchValue({
      restaurantBanner: 'https://m.media-amazon.com/images/I/61uTnaEFcqL._SS500_.jpg',
      restaurantLogo: 'https://m.media-amazon.com/images/I/61uTnaEFcqL._SS500_.jpg',

    })
  }

  async createRestaurant() {
    console.log(this.restaurantForm)

    if(this.restaurantForm.valid) {
      this.ngxLoader.start();
      let createRestaurant = await this.restaurantServe.addRestaurant(this.restaurantForm.value);
      if(createRestaurant) {
        this.gotoPage('pages/restaurant/list')
        this.ngxLoader.stop();
        this.showToast('primary', 'Success Message', 'Franchise is successfully created!');
      } else {
        let error = this.restaurantServe.getErrorMessage().value;
        this.showToast('danger', error.title, error.message);
        this.ngxLoader.stop();
      } 
    }
  }


  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_LEFT,
      preventDuplicates: false
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      titleContent,
      config);
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
    this.destroySubject.unsubscribe();
    
  }

  gotoPage(page: string) {
    this.router.navigateByUrl(page);
  }

  
  isValid(control) {
    return this.restaurantForm.controls[control].invalid && this.restaurantForm.controls[control].touched;
  }

}

function emailValid() {
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(control.value) ? null : { invalidEmail: true }
  }
} 

function matchingFields(field1, field2) {
  return spaForm => {
    if (spaForm.controls[field1].value !== spaForm.controls[field2].value)
      return { mismatchedFields: true }
  }
}

