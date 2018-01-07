import { NgModule }             						from '@angular/core';
import { RouterModule, Routes } 						from '@angular/router';
import { SelectModule }                     from 'ng2-select';
import { Select2Module }                    from 'ng2-select2';
import { TagInputModule }                   from 'ngx-chips';
import { CKEditorModule }                   from 'ng2-ckeditor';

import { KubernetesInstancesComponent }     			      from './kubernetes-instances.component';
import { KubernetesInstancesListComponent }     	      from './kubernetes-instances-list.component';
import { KubernetesInstancesDetailsComponent }  	      from './kubernetes-instances-details.component';

import { KubernetesInstancesDetailsResolver }   	      from './kubernetes-instances-details-resolver.service';


const kubernetesInstancesRoutes: Routes = [
  {
    path: 'kubernetes-instances',
    component: KubernetesInstancesComponent,
    children: [
      {
        path: '',
        component: KubernetesInstancesListComponent,
        children: [
          {
            path: ':id',
            component: KubernetesInstancesDetailsComponent,
            resolve: {
              kubernetesInstance: KubernetesInstancesDetailsResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(kubernetesInstancesRoutes)
  ],
  exports: [
    RouterModule,
    SelectModule,
    Select2Module,TagInputModule,
    CKEditorModule
  ],
  providers: [
    KubernetesInstancesDetailsResolver
  ]
})

export class KubernetesInstancesRoutingModule { }
