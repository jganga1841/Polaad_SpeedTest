"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UpdatesMenuMenuComponent = (function () {
    function UpdatesMenuMenuComponent() {
    }
    // @ViewChild(MenuComponent)
    // public menuComponent:MenuComponent;
    UpdatesMenuMenuComponent.prototype.ngOnInit = function () {
        // this.menuComponent.getlist();
    };
    return UpdatesMenuMenuComponent;
}());
UpdatesMenuMenuComponent = __decorate([
    core_1.Component({
        selector: 'my-updatesMenus',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/market_trend/updatesMenusUI.html'
    })
], UpdatesMenuMenuComponent);
exports.UpdatesMenuMenuComponent = UpdatesMenuMenuComponent;
//# sourceMappingURL=updatesMenuComponent.js.map