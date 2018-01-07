import { NgModule } 									 		from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { CommonModule } 							 		from '@angular/common';
import { Ng2Bs3ModalModule }              from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule  }                  from '../shared/shared.module';
import { UrlTypesRoutingModule } 		      from './url-types-routing.module';
import { UrlTypesComponent } 				      from './url-types.component';
import { UrlTypesListComponent } 		      from './url-types-list.component';
import { UrlTypesDetailsComponent }       from './url-types-details.component';
import { NKDatetimeModule }               from 'ng2-datetime/ng2-datetime';
import { SharedService }       		        from "../shared/shared.service";
import { PagerService }                   from '../shared/pager/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UrlTypesRoutingModule,
    Ng2Bs3ModalModule,
    NKDatetimeModule
  ],
  declarations: [
  	UrlTypesComponent,
  	UrlTypesListComponent,
  	UrlTypesDetailsComponent
  ],
  providers: [
    PagerService,
    SharedService
  ]
})
export class UrlTypesModule { }
