import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  isRunningTimer: boolean=false;  
  timer:any={
    minutes: "00",
        hours: "00",
        seconds: "00"
  }
  isRunning: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  runningTimer(action = null) {
    if (action === 'reset') {
      this.isRunningTimer = false;      
      this.timer= {
        minutes: "00",
        hours: "00",
        seconds: "00"
      };
    } else if (action === 'start') {
      this.isRunning = true;
      this.isRunningTimer = true;

    } else {
      this.isRunning = false;
      this.isRunningTimer = false;      
    }
  }

}
