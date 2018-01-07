import { NgModule }             						from '@angular/core';
import { RouterModule, Routes } 						from '@angular/router';
import { SelectModule }                     from 'ng2-select';
import { Select2Module }                    from 'ng2-select2';
import { TagInputModule }                   from 'ngx-chips';
import { CKEditorModule }                   from 'ng2-ckeditor';

import { ServiceDefinitionsComponent }     			      from './service-definitions.component';
import { ServiceDefinitionsListComponent }     	      from './service-definitions-list.component';
import { ServiceDefinitionsDetailsComponent }  	      from './service-definitions-details.component';

import { ServiceDefinitionsDetailsResolver }   	      from './service-definitions-details-resolver.service';


const serviceDefinitionsRoutes: Routes = [
  {
    path: 'service-definitions',
    component: ServiceDefinitionsComponent,
    children: [
      {
        path: '',
        component: ServiceDefinitionsListComponent,
        children: [
          {
            path: ':id',
            component: ServiceDefinitionsDetailsComponent,
            resolve: {
              serviceDefinition: ServiceDefinitionsDetailsResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(serviceDefinitionsRoutes)
  ],
  exports: [
    RouterModule,
    SelectModule,
    Select2Module,TagInputModule,
    CKEditorModule
  ],
  providers: [
    ServiceDefinitionsDetailsResolver
  ]
})

export class ServiceDefinitionsRoutingModule { }
