import { BehaviorSubject } from 'rxjs';

import { EnhancedProfileModel } from '@shared/models/enhanced-profile.model';

export class GlobalSubjects {
    public hostNameSubject: BehaviorSubject<string>;
    public tablePrefixSubject: BehaviorSubject<string>;

    public static EnhancedUserSubject: BehaviorSubject<EnhancedProfileModel>;
}