"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MasterSettingsComponent = (function () {
    function MasterSettingsComponent() {
    }
    // @ViewChild(MenuComponent)
    // public menuComponent:MenuComponent;
    MasterSettingsComponent.prototype.ngOnInit = function () {
        // this.menuComponent.getlist();
    };
    return MasterSettingsComponent;
}());
MasterSettingsComponent = __decorate([
    core_1.Component({
        selector: 'my-mastersettings',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/Masters/mastersettings.html'
    })
], MasterSettingsComponent);
exports.MasterSettingsComponent = MasterSettingsComponent;
//# sourceMappingURL=mastersettings.component.js.map