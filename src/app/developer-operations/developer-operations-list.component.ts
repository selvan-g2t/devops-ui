import 'rxjs/add/operator/switchMap';
import { Component,OnInit,Renderer,ElementRef,Inject,ViewChild, ViewEncapsulation, NgZone, ViewContainerRef}      from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable }            from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { DeveloperOperation } from './developerOperations';
import { DeveloperOperationsService } from './developer-operations.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { ModalComponent }                 from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  templateUrl: './developer-operations-list.component.html',
})

export class DeveloperOperationsListComponent implements OnInit {

  developerOperationDetails_name: string;
  developerOperationDetails_description: string;
  developerOperationDetails_date: string;
  developerOperationDetails_type: string;
  developerOperationDetails_currency: string;

  firstItem:ElementRef;
  developerOperations: DeveloperOperation[];
  selectedId: number;

  constructor(
    private renderer:Renderer,
    private service: DeveloperOperationsService,
    private route: ActivatedRoute,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) {}

  isSelected(developerOperation: DeveloperOperation) {
    return developerOperation.id === this.selectedId;
  }


  setUI(){
    var windowHeight = window.innerHeight;
    var navHeight = $('nav.navbar').height()+1;
    var h1_titleHeight = $('#h1_title').height()+1;
    var finalHeight = (windowHeight-navHeight)-h1_titleHeight-5
    $("#listTable").css("height", finalHeight +"px");
  }

  ngOnInit() {
    this.setUI();
    this.getDeveloperOperations();
  }

  getDeveloperOperations(): void {
    this.slimLoadingBarService.start();
    this.service
      .getDeveloperOperations()
      .then(developerOperations => {
        this.developerOperations = developerOperations;
        if(this.developerOperations.length){
        var firstItem = this.developerOperations[0];
        this.selectedId = firstItem.id;
    // Navigate with relative link
    this.router.navigate([firstItem.id], { relativeTo: this.route });
        }
        this.slimLoadingBarService.complete();
      });
  }

  onSelect(developerOperation: DeveloperOperation) {
    this.slimLoadingBarService.start();
    this.selectedId = developerOperation.id;

    // Navigate with relative link
    this.router.navigate([developerOperation.id], { relativeTo: this.route });
    this.slimLoadingBarService.complete();
  }


 @ViewChild('modal')
    modal: ModalComponent;
    selected: string;
    output: string;
    model: DeveloperOperation = new DeveloperOperation();
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

    open() {
        this.modal.open();
    }

}