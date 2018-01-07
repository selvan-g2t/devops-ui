import { NgModule } 									 		from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { CommonModule } 							 		from '@angular/common';
import { Ng2Bs3ModalModule }              from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule  }                  from '../shared/shared.module';
import { ServiceDefinitionsRoutingModule } 		      from './service-definitions-routing.module';
import { ServiceDefinitionsComponent } 				      from './service-definitions.component';
import { ServiceDefinitionsListComponent } 		      from './service-definitions-list.component';
import { ServiceDefinitionsDetailsComponent }       from './service-definitions-details.component';
import { NKDatetimeModule }               from 'ng2-datetime/ng2-datetime';
import { SharedService }       		        from "../shared/shared.service";
import { PagerService }                   from '../shared/pager/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ServiceDefinitionsRoutingModule,
    Ng2Bs3ModalModule,
    NKDatetimeModule
  ],
  declarations: [
  	ServiceDefinitionsComponent,
  	ServiceDefinitionsListComponent,
  	ServiceDefinitionsDetailsComponent
  ],
  providers: [
    PagerService,
    SharedService
  ]
})
export class ServiceDefinitionsModule { }
