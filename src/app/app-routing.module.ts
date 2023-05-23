import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './core/system/system.component';
//import { TimerComponent } from './core/timer/timer.component';

//const routes: Routes = [{ path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) }];


const routes: Routes = [
  {
    path: "",

    children: [
      {
        path: "apps",
        loadChildren: () => import("./core/core.module").then(m => m.CoreModule),


      },
      {
        path: "",
        redirectTo: "apps",
        pathMatch: "full",

      },
    ],
    
    component: SystemComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {





}
