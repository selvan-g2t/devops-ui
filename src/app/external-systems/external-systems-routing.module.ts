import { NgModule }             						from '@angular/core';
import { RouterModule, Routes } 						from '@angular/router';
import { SelectModule }                     from 'ng2-select';
import { Select2Module }                    from 'ng2-select2';
import { TagInputModule }                   from 'ngx-chips';
import { CKEditorModule }                   from 'ng2-ckeditor';

import { ExternalSystemsComponent }     			      from './external-systems.component';
import { ExternalSystemsListComponent }     	      from './external-systems-list.component';
import { ExternalSystemsDetailsComponent }  	      from './external-systems-details.component';

import { ExternalSystemsDetailsResolver }   	      from './external-systems-details-resolver.service';


const externalSystemsRoutes: Routes = [
  {
    path: 'external-systems',
    component: ExternalSystemsComponent,
    children: [
      {
        path: '',
        component: ExternalSystemsListComponent,
        children: [
          {
            path: ':id',
            component: ExternalSystemsDetailsComponent,
            resolve: {
              externalSystem: ExternalSystemsDetailsResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(externalSystemsRoutes)
  ],
  exports: [
    RouterModule,
    SelectModule,
    Select2Module,TagInputModule,
    CKEditorModule
  ],
  providers: [
    ExternalSystemsDetailsResolver
  ]
})

export class ExternalSystemsRoutingModule { }
