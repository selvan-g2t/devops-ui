import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { SharedModule  }        from './shared/shared.module';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { SelectModule }         from 'ng2-select';
import { Select2Module }        from 'ng2-select2';
import { CKEditorModule }       from 'ng2-ckeditor';
import { Ng2Bs3ModalModule }    from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import {AppConstants}           from './api-constants.provider';

//import { TooltipModule }        from 'ngx-bootstrap/tooltip';

import { SharedService }       	from "./shared/shared.service";
import { TagInputModule }       from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UrlTypesModule }            from './url-types/url-types.module';
import { ExternalSystemsModule }     from './external-systems/external-systems.module';
import { KubernetesInstancesModule }     from './kubernetes-instances/kubernetes-instances.module';
import { ServiceDefinitionsModule }     from './service-definitions/service-definitions.module';

import * as $ from 'jquery';

@NgModule({
  imports: [
    TagInputModule,
  //  TooltipModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    SelectModule,
    Select2Module,
    CKEditorModule,
    Ng2Bs3ModalModule,
    BrowserAnimationsModule,
    UrlTypesModule,
    ExternalSystemsModule,
    KubernetesInstancesModule,
    ServiceDefinitionsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AppConstants,SharedService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
