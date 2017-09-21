
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { DeveloperOperation } from './developerOperations';

@Injectable()

export class DeveloperOperationsService {

  constructor (private _http: Http){}

  getDeveloperOperations(): Promise<DeveloperOperation[]> {
    return this._http.get('src/app/developer-operations/developerOperations.json')
    .toPromise()
    .then(response => response.json().searchResults as DeveloperOperation[])
    .catch(this.handleError);
  }



  getDeveloperOperation(id: number): Promise<DeveloperOperation> {
    return this._http.get('src/app/developer-operations/'+id+'.json')
    .toPromise()
    .then(response => response.json() as DeveloperOperation)
    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
