"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var MaterialLayerFilter = (function () {
    function MaterialLayerFilter() {
    }
    MaterialLayerFilter.prototype.transform = function (customers, args) {
        return customers.filter(function (element) { return element.LoadingLayerid !== -1; });
    };
    return MaterialLayerFilter;
}());
MaterialLayerFilter = __decorate([
    core_1.Pipe({
        name: 'materialLayerFilter'
    }),
    core_1.Injectable()
], MaterialLayerFilter);
exports.MaterialLayerFilter = MaterialLayerFilter;
//# sourceMappingURL=materialLayerFilter.js.map