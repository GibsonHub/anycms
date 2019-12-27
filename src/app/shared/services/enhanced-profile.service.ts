import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { EnhancedProfileModel } from '../models/enhanced-profile.model';
import { BaseService } from './BaseService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as tenant from './../../tenant.config';
import { GlobalSubjects } from '@shared/subjects/global.subjects';
import { AppUtils } from 'src/app/app.utils';

@Injectable({
  providedIn: 'root'
})
export class EnhancedProfileService extends BaseService<EnhancedProfileModel> {

  //private tabelPrefix: string = tenant.tenants['default'].databasePrefix;
  
  constructor(afs: AngularFirestore, private utils: AppUtils) {
    
    super(utils.tablePrefix+'enhanced_profile', afs);
    //super(tenant.tenants['default'].databasePrefix+'enhanced_profile', afs);
    //console.log('GlobalSubjects: ', globalSubjects.hostNameSubject);
  }

  getByUserId(identifier: string) {
    return this.getBy('UserID', '==', identifier);
  }

  

  updateOrCreate(authUser) {
    if (!authUser) { return Promise.reject(); }
    //console.log('looking for UID: ' + authUser.uid);
    
    const result = this.getByUserId(authUser.uid).then((r) => {
      if (r && (r.length > 0)) {
        console.log('fetched profile: ', r[0]);
        return r[0];
      } else {
        const pf: EnhancedProfileModel = {
          // UserID: authUser.uid,
          Email: authUser.email,
          PhotoUrl: 'https://p7.hiclipart.com/preview/631/2/408/human-head-silhouette-face-clip-art-face-outline.jpg'
        };
        if (authUser && authUser.uid) {
          pf.UserID = authUser.uid;
        }

        this.collection.add(pf);
        console.log('created profile: ', pf);
        return pf;
      }
    });
    return result;
  }


}
