import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { DeveloperOperation } from './developerOperations';
import { DeveloperOperationsService } from './developer-operations.service';

@Injectable()
export class DeveloperOperationsDetailsResolver implements Resolve<DeveloperOperation> {
  constructor(private ats: DeveloperOperationsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<DeveloperOperation> {
    let id = route.params['id'];

    return this.ats.getDeveloperOperation(id).then(developerOperation => {
      if (developerOperation) {
        return developerOperation;
      } else { // id not found
        this.router.navigate(['/developer-operations']);
        return null;
      }
    });
  }
}

