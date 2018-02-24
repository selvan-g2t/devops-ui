
import 'rxjs/add/operator/toPromise';

import { Component, OnInit, OnDestroy, HostBinding, ViewChild, ViewEncapsulation, NgZone, Inject, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConstants } from '../api-constants.provider';
import { SharedService } from '../shared/shared.service';
import { ExceptionHandlingService } from '../shared/exception-handling.service';
import { ServiceDefinitionsListComponent } from './service-definitions-list.component';
import { ServiceDefinition } from './service-definition';

import { FormControl } from '@angular/forms';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import * as $ from 'jquery';

import * as moment from 'moment/moment'
import { Select2OptionData } from 'ng2-select2';


@Component({
  templateUrl: './service-definitions-details.component.html',
  styles: [`
      [hidden]:not([broken]) { display: none !important }
  `]
})
export class ServiceDefinitionsDetailsComponent implements OnInit, OnDestroy {

  public serviceDefinition: any = {};
  public busy: Promise<any>;
  originalObj: any;

  constructor(
    @Inject(NgZone) private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private service: SharedService,
    private compList: ServiceDefinitionsListComponent,
    private appConstants: AppConstants,
    private http: Http,
    private errorService: ExceptionHandlingService

  ) {
    // Use with angular v2.2 or above
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getRouteData();
  }


  ngOnDestroy() {
    //this.details_busy.unsubscribe();
  }
  getRouteData() {
    this.route.data
      .subscribe(
      (data: { serviceDefinition: any }) => {
        this.error = {};
        this.serviceDefinition = data.serviceDefinition;
        this.serviceDefinition.statusName = this.serviceDefinition.statusName == 'Active' ? true : false;
        this.originalObj = Object.assign({}, this.serviceDefinition);
      },
      (err) => {
        window.console.log('Received error:', err);
      },
      () => {
        window.console.log('Completed');
      }
      );


  }
  gotoServiceDefinitions() {
    let serviceDefinitionId = this.serviceDefinition ? this.serviceDefinition.id : null;
    this.router.navigate(['../' + serviceDefinitionId], { relativeTo: this.route });
  }
  cancel = function () {
    $('.editMode').hide();
    $('.displayMode').fadeIn();
    // TODO: Need to restore original data
    this.serviceDefinition = Object.assign({}, this.originalObj);
  }
  modify = function () {
    $('.displayMode').hide();
    $('.editMode').fadeIn();
  }
  error: any = {};
  save() {
    let obj = Object.assign({}, this.serviceDefinition);
    obj.statusName = obj.statusName ? 'Active' : 'Inactive';
    delete obj.id;
    delete obj.tags;
    this.compList.busy = this.service.put(this.appConstants.getApiEndPoint() + "/clus/kubinstances/" + this.serviceDefinition.id, obj)
      .then(response => {
        this.error = {};
        this.toastr.success(obj.serviceDefinition + ' is Updated!');
        this.compList.onSelect(this.serviceDefinition);
        $('.editMode').hide();
        $('.displayMode').fadeIn();
      }).catch(res => {
        let errors = res.error;       
        this.errorService.errorHandling(res).then(res => {
          this.error = res;
        })
      });
  }

  @ViewChild('deleteModal')
  serviceDefinitionModalDelete: ModalComponent;
  cssClass: string = 'modal-content';
  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;

  serviceDefinitionDeleteModalOpen() {
    this.serviceDefinitionModalDelete.open();
  }


  submitDeleteConfirm() {
    this.compList.busy = this.service.delete(this.appConstants.getApiEndPoint() + "/clus/kubinstances/" + this.serviceDefinition.id)
      .then(response => {
        this.serviceDefinitionModalDelete.close();
        this.toastr.success('Tag Deleted!');
        this.compList.getServiceDefinitions(this.compList.page, this.compList.pSize).then(res => {

        });
      })
  }


}
