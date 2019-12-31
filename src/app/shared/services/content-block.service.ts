import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { BaseService } from './BaseService';

import * as tenant from './../../tenant.config';
import { GlobalSubjects } from '@shared/subjects/global.subjects';
import { AppUtils } from 'src/app/app.utils';
import { ContentBlockModel } from '@shared/models/content-block.model';

@Injectable({
  providedIn: 'root'
})
export class ContentBlockService extends BaseService<ContentBlockModel> {

  constructor(afs: AngularFirestore, private utils: AppUtils) {
    
    super(utils.tablePrefix+'content_block', afs);
  }


}
