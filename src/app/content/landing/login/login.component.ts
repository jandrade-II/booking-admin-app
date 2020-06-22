import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../shared/services/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Admin } from '../../../shared/model/admin';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  destroySubject$: Subject<void> = new Subject();

  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private adminServe: AdminService,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.disableLoading();
   }

  ngOnInit(): void {
    this.getSubscriber();
    this.loginForm = this.formBuilder.group({
      email: ['josepha@email.com', [Validators.required, emailValid()]],
      password: ['12345678', Validators.required],
    });



  }


  login() {
    if(this.loginForm.valid) {
      this.ngxLoader.start();
      this.adminServe.login(this.loginForm.value)
    } else {
      //display alert notif
    }
  }
  
  getSubscriber() {
    this.adminServe.getAdminUser()
    .asObservable()
    .pipe(
      takeUntil(this.destroySubject$)
    )
    .subscribe((adminUser:Admin)=>{
      if(adminUser) {
        this.gotoPage('pages')
        this.ngxLoader.stop();
      }
    })
  }


  disableLoading() {
    setTimeout(()=>{
      const el = document.getElementById('nb-global-spinner');
      if (el) {
        el.style['display'] = 'none';
      }
    }, 0)
  }

  gotoPage(page: string) {
    this.router.navigate([page]);
  }

  isValid(control) {
    return this.loginForm.controls[control].invalid && this.loginForm.controls[control].touched;
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
    this.destroySubject$.unsubscribe();
  }
}

function emailValid() {
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(control.value) ? null : { invalidEmail: true }
  }
}