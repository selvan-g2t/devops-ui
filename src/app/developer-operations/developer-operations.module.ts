import { NgModule } 									 		from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { CommonModule } 							 		from '@angular/common';
import { Ng2Bs3ModalModule }              from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule  }                  from '../shared/shared.module';

import { DeveloperOperationsService }       		from './developer-operations.service';
import { DeveloperOperationsRoutingModule } 		from './developer-operations-routing.module';
import { DeveloperOperationsComponent } 				from './developer-operations.component';
import { DeveloperOperationsListComponent } 		from './developer-operations-list.component';
import { DeveloperOperationsDetailsComponent }  from './developer-operations-details.component';
import { NKDatetimeModule }               from 'ng2-datetime/ng2-datetime';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DeveloperOperationsRoutingModule,
    Ng2Bs3ModalModule,
    NKDatetimeModule
  ],
  declarations: [
  	DeveloperOperationsComponent,
  	DeveloperOperationsListComponent,
  	DeveloperOperationsDetailsComponent
  ],
  providers: [
    DeveloperOperationsService
  ]
})
export class DeveloperOperationsModule { }
