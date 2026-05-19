import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../../../core/http/api-base.service';
import { NullContent } from '../../../core/http/null-content.type';
import { ApiUrls } from '../../../core/navigation/api-urls';
import { buildApiUrl } from '../../../core/navigation/url.utils';
import { ProfileResponse } from '../pages/profile/profile.response';

@Injectable({
  providedIn: 'root',
})
export class UserProfilesApiService extends ApiBaseService {
  /** Get profile. */
  me(): Observable<ProfileResponse | NullContent> {
    const endpoint = buildApiUrl(ApiUrls.userProfiles.me);

    return this.get<ProfileResponse>(endpoint);
  }
}
