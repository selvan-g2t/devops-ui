import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Renderer, ElementRef, Inject, ViewChild, ViewEncapsulation, NgZone, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, Params } from '@angular/router';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AppConstants } from '../api-constants.provider';
import { KubernetesInstance } from './kubernetes-instance';
import { SharedService } from '../shared/shared.service';
import { PagerService } from '../shared/pager/index';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as moment from 'moment/moment'
import { ExceptionHandlingService } from '../shared/exception-handling.service';
import { Select2OptionData } from 'ng2-select2';
import { FormControl } from '@angular/forms';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { KubernetesInstancesComponent } from './kubernetes-instances.component';

@Component({
  templateUrl: './kubernetes-instances-list.component.html',
})

export class KubernetesInstancesListComponent implements OnInit {
  //for custom navigation
  navigationProperty = {
    "currentItem": 0, //current view item. Assign $index of array on click
    "stateName": "string", //state Name to navigate from directive
    "stateParamName": "string",
    "navItems": []
  }

  @ViewChild('firstItem') a;

  public kubernetesInstance: any = {
    statusName: true
  };
  search:string;

  public kubernetesInstances: any;
  public selectedId: number;
  // pager object
  public pager: any = {};
  // paged items
  public pagedItems: any[];
  public pSize: number = 10;
  public page: number = 1;
  public disablePagination: boolean;
  public searchFilterMessage: any;
  public paginationProperty: any;

  constructor(
    private renderer: Renderer,
    private service: SharedService,
    private route: ActivatedRoute,
    private pagerService: PagerService,
    private translate: TranslateService,
    private router: Router,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private appConstants: AppConstants,
    private KubernetesInstancesComponent: KubernetesInstancesComponent,
    private errorService: ExceptionHandlingService
  ) {
    // Use with angular v2.2 or above
    this.toastr.setRootViewContainerRef(vcr);
  }

  isSelected(kubernetesInstance: KubernetesInstance) {
    this.navigationProperty = JSON.parse(localStorage.getItem('navProp'));
    return kubernetesInstance.id === this.navigationProperty.navItems[this.navigationProperty.currentItem];
  }


  setUI() {

    var windowHeight = window.innerHeight;
    var navHeight = $('nav.navbar').height() + 1;
    var h1_titleHeight = $('#h1_title').height() + 1;
    var finalHeight = (windowHeight - navHeight) - h1_titleHeight - 5
    $("#listTable").css("height", finalHeight + "px");
  }

  ngOnInit() {
    this.setUI();
    this.getKubernetesInstances(this.page, this.pSize);
  }

  list_busy: Promise<any>;
  busy: Promise<any>;
  getKubernetesInstances(page, pSize, search?) {
    return new Promise((resolve, reject) => {
      this.list_busy = this.service
        //.get(this.appConstants.apiEndPoint + this.appConstants.applicaitonId + "/clus/kubinstances", { pageNumber: page, pageSize: pSize, name: search })
        .get("./assets/kubernetes-instances/kubernetes-instances.json", {})
        .then(kubernetesInstances => {
          this.kubernetesInstances = kubernetesInstances.searchResults;
          this.pagedItems = this.kubernetesInstances;
          this.navigationProperty.navItems = _.pluck(kubernetesInstances.searchResults, 'id');
          this.navigationProperty.currentItem = 0;
          localStorage.setItem('navProp', JSON.stringify(this.navigationProperty));
          if (kubernetesInstances.pagingInfo && typeof kubernetesInstances.pagingInfo == "object") {
            this.disablePagination = false;
            this.paginationProperty = kubernetesInstances.pagingInfo
            /*pagination text*/
            this.pager = this.pagerService.getPager(this.paginationProperty.totalRows, this.paginationProperty.pageNumber, this.paginationProperty.pageSize);
            // get current page of items
            this.pagedItems = this.kubernetesInstances.slice(this.pager.startIndex, this.pager.endIndex + 1);
            var totalItemsFound = this.translate.instant("administration_totalItemsFound_label");
            var displayingItems = this.translate.instant('administration_displayingItems_label');
            var totalPages = this.translate.instant('administration_totalPages_label');;
            this.searchFilterMessage = totalItemsFound + this.paginationProperty.totalRows + " | " +
              displayingItems + " " + this.paginationProperty.startingOffset + " - " + this.paginationProperty.endingOffset + " | " +
              totalPages + this.paginationProperty.totalPages;
            this.KubernetesInstancesComponent.getMessage(this.searchFilterMessage);
          } else {
            this.disablePagination = true;
            var totalItemsFound = this.translate.instant("administration_totalItemsFound_label");
          }

          if (this.kubernetesInstances.length) {
            let firstItem = this.kubernetesInstances[0];
            // Navigate with relative link
            this.busy = this.router.navigate([firstItem.id], { relativeTo: this.route });
          }
          resolve(kubernetesInstances);
        });
    })

  }
  setPage(page: number, pageSize: number) {
    this.page = page
    if (pageSize != undefined) {
      this.pSize = pageSize;
    }
    else {
      this.pSize = this.paginationProperty.pageSize
    }
    if (this.pSize == undefined) {
      this.pSize = 1;
    }
    if (page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.kubernetesInstances.length, page, this.pSize);
    // get current page of items
    this.pagedItems = this.kubernetesInstances.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.getKubernetesInstances(this.page, this.pSize);
  }
  onSelect(kubernetesInstance: any) {
    this.kubernetesInstances.forEach(element => {
      if (element.id == kubernetesInstance.id) {
        element.kubernetesInstance = kubernetesInstance.kubernetesInstance;
        element.statusName = kubernetesInstance.statusName ? 'Active' : 'Inactive';
      }
    });
    this.navigationProperty = JSON.parse(localStorage.getItem('navProp'));
    this.navigationProperty.currentItem = _.indexOf(this.navigationProperty.navItems, kubernetesInstance.id)
    localStorage.setItem('navProp', JSON.stringify(this.navigationProperty));
    // Navigate with relative link
    this.busy = this.router.navigate([kubernetesInstance.id], { relativeTo: this.route });
  }
  error: any = {};
  modalBusy: any;
  save(): void {
    let obj = Object.assign({}, this.kubernetesInstance);
    if (obj.kubernetesInstanceTags)
      obj.kubernetesInstanceTags = obj.kubernetesInstanceTags.map(tag => {
        return { id: tag.value };
      });
    obj.statusName = obj.statusName ? 'Active' : 'Inactive';
    this.modalBusy = this.service.post(this.appConstants.apiEndPoint + "/clus/kubinstances", obj)
      .then(response => {
        this.error = {};
        this.modal.close();
        this.toastr.success(obj.kubernetesInstance + ' is Added!');
        this.getKubernetesInstances(this.page, this.pSize).then(res => {
          this.onSelect(response)
          this.selectedId = response.id;
          this.list_busy = this.router.navigate([response.id], { relativeTo: this.route });
        });
      }).catch(res => {
        let errors = res.error;       
        this.errorService.errorHandling(res).then(res => {
          this.error = res;
        })
      });
  }
  toUTCDate(date: any) {
    return moment(date).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
  }


  @ViewChild('addKubernetesInstanceModal')
  modal: ModalComponent;
  selected: string;
  output: string;
  model: KubernetesInstance = new KubernetesInstance();
  cssClass: string = 'modal-content';
  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;

  closed() {
    this.output = '(closed) ' + this.selected;
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  opened() {
    this.output = '(opened)';
  }

  kubernetesInstanceOpen() {
    this.kubernetesInstance = {
      statusName: true
    }
    this.modal.open();
  }

}