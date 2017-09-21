import { Component, OnInit, HostBinding, ViewChild, ViewEncapsulation, NgZone, Inject, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router }         from '@angular/router';
import { SlimLoadingBarService }          from 'ng2-slim-loading-bar';
import { NgUploaderOptions }              from 'ngx-uploader';
import { ToastsManager }                  from 'ng2-toastr/ng2-toastr';

import { Observable }                     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DeveloperOperation }                   from './developerOperations';


@Component({
  templateUrl: './developer-operations-details.component.html',
  styles:[ '[hidden]:not([broken]) { display: none !important }]' ]
})
export class DeveloperOperationsDetailsComponent implements OnInit {


  developerOperation: DeveloperOperation;
  developerOperationDetails_name: string;


  constructor(
    @Inject(NgZone) private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    // Use with angular v2.2 or above
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {


    this.route.data
      .subscribe((data: { developerOperation: DeveloperOperation }) => {
       // debugger;
        this.developerOperation = data.developerOperation;
        this.developerOperationDetails_name = data.developerOperation.name;
        this.toastr.success('Success!');
      });
  }


  modify() {
    $('.displayMode').hide();
    $('.editMode').fadeIn();
  }
  cancel() {
    $('.editMode').hide();
    $('.displayMode').fadeIn();
    this.gotoDeveloperOperations();
  }
  save() {
    this.developerOperation.name = this.developerOperationDetails_name;
    this.gotoDeveloperOperations();
  }

  gotoDeveloperOperations() {
    let developerOperationId = this.developerOperation ? this.developerOperation.id : null;
    this.router.navigate(['../'+developerOperationId], { relativeTo: this.route });
  }


}

