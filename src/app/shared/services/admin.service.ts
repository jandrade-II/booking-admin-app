import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { Creds, Admin } from '../model/admin'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUser = new BehaviorSubject<Admin>(null);

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
 
  ) { 
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async login(creds: Creds) {

    console.log(creds)
    await this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password).then(async (result)=>{
        console.log(result)
        this.authenticate(result.user)
    }).catch((error)=>{
      console.log("error: ", error)
    })
  }

  
  authenticate(adminuser: firebase.User) {
    this.afs.collection('admins').doc(adminuser.uid)
    .valueChanges().subscribe((res:Admin)=>{
      if(/*adminuser.emailVerified*/ true) {
        // res['displayName'] = res.firstName + ' ' + res.lastName;
        // res['emailVerified'] = adminuser.emailVerified;
        console.log('res:', res)
        res.adminId = adminuser.uid;
        this.adminUser.next(res);
      } else {
        //not verified email
      }

    })
  }


  getAdminUser() {
    return this.adminUser;
  }


  


}
