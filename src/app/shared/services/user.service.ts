import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

import { User } from '../models';
import { AlertService } from './alert.service';

import * as tenant from './../../tenant.config';

@Injectable()
export class UserService {

  private tabelPrefix: string = tenant.tenants['default'].databasePrefix;

  constructor(private alertService: AlertService) {}

  public saveUserInfo(uid: string, name: string, email: string): Promise<string> {
    return firebase.database().ref().child(this.tabelPrefix + 'users/' + uid).set({
      name: name,
      email: email
    });
  }

  public updateUserInfo(uid: string, displayName: string, bio: string): Promise<string> {
    return firebase.database().ref().child(this.tabelPrefix + 'users/' + uid).update({
      displayName: displayName,
      bio: bio
    });
  }

  public keepInTouch(email: string) {
    this.alertService.showToaster('Your email is saved');
    return firebase.database().ref().child(this.tabelPrefix + 'touch/').push({
      email: email
    });
  }

  public contactFormSend(
    company: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    postal: string,
    message: string
  ) {
    this.alertService.showToaster('This contact form is saved');
    return firebase.database().ref().child(this.tabelPrefix + 'contactform/').push({
      company: company,
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      postal: postal,
      message: message
    });
  }

  public getUserProfileInformation(): void {
    const user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
  }

  public verificationUserEmail(): Promise<void> {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

  public sendUserPasswordResetEmail(): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email).then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

}
