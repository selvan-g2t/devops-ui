import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { TooltipModule }        from 'ngx-bootstrap/tooltip';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/url-types',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  //  TooltipModule.forRoot()
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
