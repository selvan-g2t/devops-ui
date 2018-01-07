import { NgModule }             						from '@angular/core';
import { RouterModule, Routes } 						from '@angular/router';
import { SelectModule }                     from 'ng2-select';
import { Select2Module }                    from 'ng2-select2';
import { TagInputModule }                   from 'ngx-chips';
import { CKEditorModule }                   from 'ng2-ckeditor';

import { UrlTypesComponent }     			      from './url-types.component';
import { UrlTypesListComponent }     	      from './url-types-list.component';
import { UrlTypesDetailsComponent }  	      from './url-types-details.component';

import { UrlTypesDetailsResolver }   	      from './url-types-details-resolver.service';


const urlTypesRoutes: Routes = [
  {
    path: 'url-types',
    component: UrlTypesComponent,
    children: [
      {
        path: '',
        component: UrlTypesListComponent,
        children: [
          {
            path: ':id',
            component: UrlTypesDetailsComponent,
            resolve: {
              urlType: UrlTypesDetailsResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(urlTypesRoutes)
  ],
  exports: [
    RouterModule,
    SelectModule,
    Select2Module,TagInputModule,
    CKEditorModule
  ],
  providers: [
    UrlTypesDetailsResolver
  ]
})

export class UrlTypesRoutingModule { }
