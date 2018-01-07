import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ServiceDefinition } from './service-definition';
import { SharedService } from '../shared/shared.service';
import { AppConstants } from '../api-constants.provider';


@Injectable()
export class ServiceDefinitionsDetailsResolver implements Resolve<ServiceDefinition> {
  constructor(
    private ats: SharedService,
    private router: Router,
    private appConstants: AppConstants
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ServiceDefinition> {
    let id = route.params['id'];
    //return this.ats.get(this.appConstants.apiEndPoint + this.appConstants.applicaitonId + "/clus/kubinstances/" + id, {}).then(serviceDefinition => {
    return this.ats.get("./assets/service-definitions/" + id + '.json', {}).then(serviceDefinition => {
      if (serviceDefinition) {
        return serviceDefinition;
      } else { // id not found
        this.router.navigate(['/service-definitions']);
        return null;
      }
    });
  }
}

