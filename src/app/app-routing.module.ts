import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'quote-requests',
    pathMatch: 'full'
  },{
    path: 'quote-requests',
    loadChildren: 'app/developer-operations/developer-operations.module#DeveloperOperationsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
