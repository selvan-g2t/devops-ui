import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { UrlType } from './url-type';
import { SharedService } from '../shared/shared.service';
import { AppConstants } from '../api-constants.provider';


@Injectable()
export class UrlTypesDetailsResolver implements Resolve<UrlType> {
  constructor(
    private ats: SharedService,
    private router: Router,
    private appConstants: AppConstants
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UrlType> {
    let id = route.params['id'];
    //return this.ats.get(this.appConstants.apiEndPoint + this.appConstants.applicaitonId + "/clus/endpointtypes/" + id, {}).then(urlType => {
    return this.ats.get("./assets/url-types/" + id + '.json', {}).then(urlType => {
      if (urlType) {
        return urlType;
      } else { // id not found
        this.router.navigate(['/url-types']);
        return null;
      }
    });
  }
}

