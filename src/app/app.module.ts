import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule  } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'ng2-select';
import { CKEditorModule }  from 'ng2-ckeditor';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as $ from 'jquery';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule,
    SelectModule,
    CKEditorModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
