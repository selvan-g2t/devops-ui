
import { NgUploaderModule } from 'ngx-uploader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';
import { Http } from '@angular/http';
import { Gravatar }  from 'ng2-gravatar-directive/src/gravatar';
import { TruncatePipe } from '../shared/truncate.pipe';
import { LocalToUTcPipe } from '../shared/pipe/local-to-utc.pipe';
import { MyFilterPipe } from '../shared/pipe/filter-array';
import { MomentModule } from 'angular2-moment/moment.module';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { TagInputModule }       from 'ngx-chips';
import { NavTimeDirective  }              from '../shared/directives/itemNav.directive';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { NoResultComponent } from '../shared/components/noresult';

import { ExceptionHandlingService } from './exception-handling.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function busyConfigFactory() {
  return new BusyConfig({
            	message: '',
                backdrop: true,
                delay: 0,
                minDuration: 700,
            });
}

@NgModule({
    imports: [
        CommonModule,
        TagInputModule,
        ToastModule.forRoot(),    
        NgUploaderModule,
        TranslateModule.forRoot({
             provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        MomentModule,
        NgxPaginationModule,
        InfiniteScrollModule
    ],
    providers: [ 
        { provide: BusyConfig, useFactory: busyConfigFactory },
        ExceptionHandlingService
    ],
      declarations: [
          NavTimeDirective,
          Gravatar,
          TruncatePipe,
          LocalToUTcPipe,
          MyFilterPipe,
          NoResultComponent
      ],
    exports: [NgUploaderModule, TranslateModule, Gravatar, TruncatePipe, MomentModule,LocalToUTcPipe,BusyModule,NavTimeDirective,NgxPaginationModule,MyFilterPipe,TagInputModule,NoResultComponent,InfiniteScrollModule]
})
export class SharedModule {
    constructor(translate: TranslateService){
         // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }
}
