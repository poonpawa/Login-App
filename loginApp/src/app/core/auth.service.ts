import { Injectable } from "@angular/core";
//import "rxjs/add/operator/toPromise";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            this.setName(value).then(res => {
              resolve(res);
            });
          },
          err => reject(err)
        );
    });
  }

  setName(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: value.name
        })
        .then(
          res => {
            resolve(res);
            console.log("saved User: " + user.displayName);
          },
          err => {
            console.log("username not saved");
          }
        );
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
