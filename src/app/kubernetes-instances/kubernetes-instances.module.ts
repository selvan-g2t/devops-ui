import { NgModule } 									 		from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { CommonModule } 							 		from '@angular/common';
import { Ng2Bs3ModalModule }              from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule  }                  from '../shared/shared.module';
import { KubernetesInstancesRoutingModule } 		      from './kubernetes-instances-routing.module';
import { KubernetesInstancesComponent } 				      from './kubernetes-instances.component';
import { KubernetesInstancesListComponent } 		      from './kubernetes-instances-list.component';
import { KubernetesInstancesDetailsComponent }       from './kubernetes-instances-details.component';
import { NKDatetimeModule }               from 'ng2-datetime/ng2-datetime';
import { SharedService }       		        from "../shared/shared.service";
import { PagerService }                   from '../shared/pager/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    KubernetesInstancesRoutingModule,
    Ng2Bs3ModalModule,
    NKDatetimeModule
  ],
  declarations: [
  	KubernetesInstancesComponent,
  	KubernetesInstancesListComponent,
  	KubernetesInstancesDetailsComponent
  ],
  providers: [
    PagerService,
    SharedService
  ]
})
export class KubernetesInstancesModule { }
