"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// The confirmation dialog is used through this service.
// When injected in the confirm component, the activate
// function of this service is bound to the corresponding
// function in that component. The component is in charge
// of manipulating the DOM to show the dialog and get the
// result back (via a Promise). This way, we can just
// add the component to the root app component's template,
// and then inject this service to use it anywhere.
var ConfirmService = (function () {
    function ConfirmService() {
    }
    return ConfirmService;
}());
ConfirmService = __decorate([
    core_1.Injectable()
], ConfirmService);
exports.ConfirmService = ConfirmService;
//# sourceMappingURL=dialog.service.js.map