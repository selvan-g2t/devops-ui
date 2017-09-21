import { SlimLoadingBarModule } 		from 'ng2-slim-loading-bar';
import { NgUploaderModule } 				from 'ngx-uploader';
import { NgModule } 								from '@angular/core';
import { ToastModule } 							from 'ng2-toastr/ng2-toastr';

@NgModule({
    imports: [
        ToastModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        NgUploaderModule
    ],
    exports: [SlimLoadingBarModule, NgUploaderModule]
})
export class SharedModule {
}
