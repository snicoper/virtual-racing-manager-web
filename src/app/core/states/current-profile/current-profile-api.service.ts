import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../../http/api-base.service';
import { NullContent } from '../../http/null-content.type';
import { ApiUrls } from '../../navigation/api-urls';
import { buildApiUrl } from '../../navigation/url.utils';
import { CurrentProfileResponse } from './current-profile.response';

@Injectable({
  providedIn: 'root',
})
export class CurrentProfileApiService extends ApiBaseService {
  /** Get profile. */
  me(): Observable<CurrentProfileResponse | NullContent> {
    const endpoint = buildApiUrl(ApiUrls.userProfiles.me);

    return this.get<CurrentProfileResponse>(endpoint);
  }
}
