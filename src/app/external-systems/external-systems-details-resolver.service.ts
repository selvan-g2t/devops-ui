import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ExternalSystem } from './external-system';
import { SharedService } from '../shared/shared.service';
import { AppConstants } from '../api-constants.provider';


@Injectable()
export class ExternalSystemsDetailsResolver implements Resolve<ExternalSystem> {
  constructor(
    private ats: SharedService,
    private router: Router,
    private appConstants: AppConstants
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ExternalSystem> {
    let id = route.params['id'];
    //return this.ats.get(this.appConstants.apiEndPoint + this.appConstants.applicaitonId + "/clus/endpointurls/" + id, {}).then(externalSystem => {
    return this.ats.get("./assets/external-systems/" + id + '.json', {}).then(externalSystem => {
      if (externalSystem) {
        return externalSystem;
      } else { // id not found
        this.router.navigate(['/external-systems']);
        return null;
      }
    });
  }
}

