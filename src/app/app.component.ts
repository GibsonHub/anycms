import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseKeys } from './firebase.config';

import { GlobalSubjects } from '@shared/subjects/global.subjects';
import { Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import * as tenant from './tenant.config';
import { EnhancedProfileService } from '@shared/services/enhanced-profile.service';
import { EnhancedProfileModel } from '@shared/models/enhanced-profile.model';
import { AppUtils } from './app.utils';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private globalSubject: GlobalSubjects = new GlobalSubjects();
  private maxWait: number = 1000;
  private timerRef: any;

  //private tabelPrefix: string = tenant.tenants['default'].databasePrefix;
  //private tabelPrefix: string = tenant.tenants['default'].databasePrefix;

  constructor(private enhancedProfileService: EnhancedProfileService, private _route: ActivatedRoute, private utils: AppUtils) {
    const hostName = utils.host;
    //this.globalSubject.hostNameSubject.source = new Observable<string>();
    //this.globalSubject.hostNameSubject.next(hostName);
    console.log('AppComponent HOST: ', hostName);
  }

  public ngOnInit(): void {
  
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseKeys);
    }
    if (firebase) {
      console.log('WTF');
      // this.globalSubject = new GlobalSubjects();
      // console.log('appComponent user:', firebase.auth().currentUser);
      this.timerRef = timer(500, 1000).pipe(
        take(this.maxWait)
      ).subscribe(x => {
        console.log('WAITING...: ' + x);
        if (firebase.auth().currentUser) {
          const currUser = firebase.auth().currentUser;

          this.enhancedProfileService.getByUserId(firebase.auth().currentUser.uid).then((u) => {
            console.log('looked for enhanced profile', u);
            if (u.length){
              console.log('found one enhanced user');
              this.appendEnhancedUser(firebase.auth().currentUser, u);
            } else {
              console.log('no enhanced users found');
              const eu: EnhancedProfileModel = {
                UserID: currUser.uid,
                Email: currUser.email,
                SpecialAccess: false
              };

              this.enhancedProfileService.add(eu).then((obj) => {
                //console.log('ADDED !', obj);
                this.appendEnhancedUser(currUser, obj);
              });
            }
          }).catch(err => {
            console.log('ERROR fetching enhanced user', err);
          });
          
          this.timerRef.unsubscribe();
        }
      });
    }
  }

  appendEnhancedUser(currentUser, enhancedUser) {
    currentUser['enhanced'] = Array.isArray(enhancedUser) ? enhancedUser[0] : enhancedUser;
    console.log('!!! after enhancement: ', currentUser);

  }

}
