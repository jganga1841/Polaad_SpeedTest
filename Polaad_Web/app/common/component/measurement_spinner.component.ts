import {Component} from '@angular/core';

@Component({
  selector: 'measurement-spinner',
  template: 
    '<input type="number" min="0" step="1" [ngModel]="model" (ngModelChange)="validate($event)">'
})

export class MesurementSpinnerComponent {
  spinnermodel = 3;
  constructor() { console.clear(); }
  validate(value:number)  {
    value < 0 ? this.spinnermodel = 0 : this.spinnermodel = value;
  }
  
}
