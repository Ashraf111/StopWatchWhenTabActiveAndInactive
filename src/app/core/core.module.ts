import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginModule } from '../plugin/plugin.module';
import { SystemComponent } from './system/system.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SystemComponent,
  ],
  imports: [
    CommonModule,
    PluginModule,
    RouterModule
  ]
})
export class CoreModule { }
