import { NgModule } 									 		from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { CommonModule } 							 		from '@angular/common';
import { Ng2Bs3ModalModule }              from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule  }                  from '../shared/shared.module';
import { ExternalSystemsRoutingModule } 		      from './external-systems-routing.module';
import { ExternalSystemsComponent } 				      from './external-systems.component';
import { ExternalSystemsListComponent } 		      from './external-systems-list.component';
import { ExternalSystemsDetailsComponent }       from './external-systems-details.component';
import { NKDatetimeModule }               from 'ng2-datetime/ng2-datetime';
import { SharedService }       		        from "../shared/shared.service";
import { PagerService }                   from '../shared/pager/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ExternalSystemsRoutingModule,
    Ng2Bs3ModalModule,
    NKDatetimeModule
  ],
  declarations: [
  	ExternalSystemsComponent,
  	ExternalSystemsListComponent,
  	ExternalSystemsDetailsComponent
  ],
  providers: [
    PagerService,
    SharedService
  ]
})
export class ExternalSystemsModule { }
