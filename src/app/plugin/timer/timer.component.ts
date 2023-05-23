import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  counter: number = 0;
  timeoutId: any = null;
  isRunning: boolean = true;
  seconds: string = "00";
  minutes: string = "00";
  hours: string = "00";
  @Output() notifyUnit = new EventEmitter<any>();
  @Output() notifyTimer = new EventEmitter<any>();
  
  private _isDisabled: boolean = false;
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  @Input() public set isDisabled(v: boolean) {
    this._isDisabled = v;
  }

  private _showRunTimer: boolean = true;

  _isRunningTimer: boolean = false;
  @Input() set isRunningTimer(value) {
    this._isRunningTimer = value;
    if (this._isRunningTimer) {
      this.reStart();
    } else {
      this.stop();
    }
  }
  get isRunningTimer() {
    return this._isRunningTimer;
  }

  _timer = {
    minutes: "00",
    hours: "00",
    seconds: "00"
  };
  @Input() set timer(value) {
    this._timer = value;
    this.minutes = this._timer.minutes;
    this.hours = this._timer.hours;
    this.seconds = this._timer.seconds;
  }
  get timer() {
    return this._timer;
  }
 




  public get showRunTimer(): boolean {
    return this._showRunTimer;
  }
  @Input() public set showRunTimer(v: boolean) {
    this._showRunTimer = v;
  }
  constructor() { }

  ngOnInit(): void {
  }

  tick() {

    let mcountercal = 0;
    let currentSeconds = parseInt(this.seconds);
    let currentMinutes = parseInt(this.minutes);
    let currentHours = parseInt(this.hours);
    this.counter = currentHours * 3600000 + currentMinutes * 60000 + currentSeconds * 1000
    const startTime = Date.now() - (this.counter || 0);
    this.timeoutId = setInterval(() => {
      this.counter = Date.now() - startTime;
      currentHours = Math.floor(this.counter / 3600000);
      currentMinutes = Math.floor(this.counter / 60000) - currentHours * 60;
      mcountercal = Math.floor(this.counter / 60000);
      currentSeconds = Math.floor(this.counter / 1000) - mcountercal * 60;     
      this.hours = this.getFormattedTimeStamp(currentHours.toString());
      this.minutes = this.getFormattedTimeStamp(currentMinutes.toString())
      this.seconds = this.getFormattedTimeStamp(currentSeconds.toString())
      this.notifyUnit.emit({
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds
      });
     
    });

}


getFormattedTimeStamp(timestamp:any) {
  return timestamp < 10 ? "0" + timestamp : timestamp;
}

calculateTimeSpent(event:any) {
  this.normalizeBlankAndNegetiveInput();
  switch (event) {
    case "hours":
      this.hours = this.getFormattedTimeStamp(parseInt(this.hours));
      break;
    case "minutes":
      this.minutes = this.getFormattedTimeStamp(parseInt(this.minutes));
      break;
    case "seconds":
      this.seconds = this.getFormattedTimeStamp(parseInt(this.seconds));
      break;
    default:
      break;
  }
  this.notifyUnit.emit({
    hours: this.getFormattedTimeStamp(parseInt(this.hours)),
    minutes: this.getFormattedTimeStamp(parseInt(this.minutes)),
    seconds: this.getFormattedTimeStamp(parseInt(this.seconds))
  });
  this.notifyTimer.emit("stop");
}

normalizeBlankAndNegetiveInput() {
  let currentSeconds = parseInt(this.seconds);
  if (isNaN(currentSeconds) || currentSeconds <= 0) this.seconds = "00";

  let currentMinutes = parseInt(this.minutes);
  if (isNaN(currentMinutes) || currentMinutes <= 0) this.minutes = "00";

  let currentHours = parseInt(this.hours);
  if (isNaN(currentHours) || currentHours <= 0) this.hours = "00";
}

stop() {
  this.isRunning = false;
  this.resetTimeout();
  this.timeoutId = null;
}

resetTimeout() {
  if (this.timeoutId) {
    clearTimeout(this.timeoutId);
  }
}
runningTimer(action:any) {
  this.notifyTimer.emit(action);
}
reStart() {
  this.isRunning = true;
  this.tick();
}


}