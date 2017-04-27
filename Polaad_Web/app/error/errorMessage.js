"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ErrorMessage = (function () {
    function ErrorMessage() {
        this.isConfirmed = false;
    }
    ErrorMessage.prototype.showErrorMessage = function (msg, header) {
        this.ErrorMsg = msg;
        this.MsgHeader = header;
        this.ErrorMessageIsVisible = true;
        //  return new Promise<boolean>((resolve, reject) =>{
        //      this.dialogConfirmation = () => resolve(true);
        //     this.dialogRejection = () => resolve(false);
        //  })
    };
    ErrorMessage.prototype.confirm = function () {
        this.isConfirmed = true;
        this.dialogConfirmation();
    };
    ErrorMessage.prototype.reject = function () {
        this.dialogRejection();
    };
    ErrorMessage.prototype.hideErrorMsg = function () {
        this.isConfirmed = true;
        this.ErrorMessageIsVisible = false;
    };
    return ErrorMessage;
}());
ErrorMessage = __decorate([
    core_1.Component({
        selector: 'app-error-message',
        templateUrl: 'app/error/errorMessage.html',
    })
], ErrorMessage);
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=errorMessage.js.map