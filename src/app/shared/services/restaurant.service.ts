import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../model/restaurant';
import { ErrorMsg } from '../model/error';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantCollection: AngularFirestoreCollection<Restaurant>;
  private errorMsg = new BehaviorSubject<ErrorMsg>({});

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,

  ) { 
    this.restaurantCollection =  this.afs.collection('restaurants');
  }


  async addRestaurant(restaurant: Restaurant) {
    let that = this;
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(restaurant.email, restaurant.password)
        .then((result)=>{

          result.user.sendEmailVerification().then(function() {
            that.restaurantCollection.doc(result.user.uid).set(restaurant)
            .then(async ()=>{
              resolve(true)
            })
            .catch((err)=>{
              console.log(err)
              that.createErrorMsg('Error Message', err.message)
              resolve(false);
            });
          }).catch(function(err){
            console.log(err)
            that.createErrorMsg('Error Message', err.message)
            resolve(false)
          })
         
        }).catch((err)=>{
          console.log(err)

          this.createErrorMsg('Error Message', err.message)
          resolve(false)
        })
    
    });
  } 

  createErrorMsg(errorTitle, errorMsg) {
    let error = {} as ErrorMsg;
    error.title = errorTitle;
    error.message = errorMsg;
    this.errorMsg.next(error)
  }

  getErrorMessage() {
    return this.errorMsg;
  }

}
