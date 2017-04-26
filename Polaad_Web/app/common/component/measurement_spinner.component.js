"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var MesurementSpinnerComponent = (function () {
    function MesurementSpinnerComponent() {
        this.spinnermodel = 3;
        console.clear();
    }
    MesurementSpinnerComponent.prototype.validate = function (value) {
        value < 0 ? this.spinnermodel = 0 : this.spinnermodel = value;
    };
    MesurementSpinnerComponent = __decorate([
        core_1.Component({
            selector: 'measurement-spinner',
            template: '<input type="number" min="0" step="1" [ngModel]="model" (ngModelChange)="validate($event)">'
        }), 
        __metadata('design:paramtypes', [])
    ], MesurementSpinnerComponent);
    return MesurementSpinnerComponent;
}());
exports.MesurementSpinnerComponent = MesurementSpinnerComponent;
//# sourceMappingURL=measurement_spinner.component.js.map