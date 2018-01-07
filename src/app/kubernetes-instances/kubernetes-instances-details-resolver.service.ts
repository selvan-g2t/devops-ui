import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { KubernetesInstance } from './kubernetes-instance';
import { SharedService } from '../shared/shared.service';
import { AppConstants } from '../api-constants.provider';


@Injectable()
export class KubernetesInstancesDetailsResolver implements Resolve<KubernetesInstance> {
  constructor(
    private ats: SharedService,
    private router: Router,
    private appConstants: AppConstants
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<KubernetesInstance> {
    let id = route.params['id'];
    //return this.ats.get(this.appConstants.apiEndPoint + this.appConstants.applicaitonId + "/clus/kubinstances/" + id, {}).then(kubernetesInstance => {
    return this.ats.get("./assets/kubernetes-instances/" + id + '.json', {}).then(kubernetesInstance => {
      if (kubernetesInstance) {
        return kubernetesInstance;
      } else { // id not found
        this.router.navigate(['/kubernetes-instances']);
        return null;
      }
    });
  }
}

