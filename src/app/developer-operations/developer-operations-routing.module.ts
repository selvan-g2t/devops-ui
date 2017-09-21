import { NgModule }             						from '@angular/core';
import { RouterModule, Routes } 						from '@angular/router';
import { SelectModule }                     from 'ng2-select';
import { CKEditorModule }                   from 'ng2-ckeditor';

import { DeveloperOperationsComponent }     			from './developer-operations.component';
import { DeveloperOperationsListComponent }     	from './developer-operations-list.component';
import { DeveloperOperationsDetailsComponent }  	from './developer-operations-details.component';

import { DeveloperOperationsDetailsResolver }   	from './developer-operations-details-resolver.service';


const developerOperationsRoutes: Routes = [
  {
    path: '',
    component: DeveloperOperationsComponent,
    children: [
      {
        path: '',
        component: DeveloperOperationsListComponent,
        children: [
          {
            path: ':id',
            component: DeveloperOperationsDetailsComponent,
            resolve: {
              developerOperation: DeveloperOperationsDetailsResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(developerOperationsRoutes)
  ],
  exports: [
    RouterModule,
    SelectModule,
    CKEditorModule
  ],
  providers: [
    DeveloperOperationsDetailsResolver
  ]
})

export class DeveloperOperationsRoutingModule { }
