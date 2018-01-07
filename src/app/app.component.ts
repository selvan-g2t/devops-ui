import { Http, Response, Headers, RequestOptions,  Jsonp, URLSearchParams,BrowserXhr } from '@angular/http';
import {AppConstants} from './api-constants.provider';
import { Component,OnInit,Renderer,ElementRef,Inject,ViewChild,Output,EventEmitter,ViewContainerRef }      from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private http:Http,
    private appConstants:AppConstants,
    public toastr: ToastsManager, 
    vRef: ViewContainerRef
  ){
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit(){
     /*  this.http.get(this.appConstants.userEndPont+'search?emailAddress='+this.appConstants.userEmailId).subscribe(
          data => {
            let testResponse = data.json();
            sessionStorage.setItem('customerCode',testResponse.portalCustomer.customerCode);
            sessionStorage.setItem('customerId',testResponse.portalCustomer.id);
          }
      ); */
  }
 

}
