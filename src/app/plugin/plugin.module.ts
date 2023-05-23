import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginComponent } from './plugin.component';
import { TimerComponent } from './timer/timer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PluginComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
  ,
  exports:[
    TimerComponent
  ]
})
export class PluginModule { }
