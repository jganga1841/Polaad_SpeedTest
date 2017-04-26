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
var confirm_service_1 = require('./confirm.service');
// http://koscielniak.me/post/2016/03/angular2-confirm-dialog-component/
var KEY_ESC = 27;
var ConfirmComponent = (function () {
    function ConfirmComponent(confirmService) {
        this._defaults = {
            title: 'Confirm',
            message: 'Confirm the operation?',
            cancelText: 'Cancel',
            okText: 'OK'
        };
        // assign a function to the property activate of ConfirmService.
        // After this, calling activate on ConfirmService will cause the function activate
        // from ConfirmComponent to be executed.
        confirmService.activate = this.activate.bind(this);
    }
    ConfirmComponent.prototype.setLabels = function (message, title) {
        if (message === void 0) { message = this._defaults.message; }
        if (title === void 0) { title = this._defaults.title; }
        this.title = title;
        this.message = message;
        this.okText = this._defaults.okText;
        this.cancelText = this._defaults.cancelText;
    };
    ConfirmComponent.prototype.activate = function (message, title) {
        var _this = this;
        if (message === void 0) { message = this._defaults.message; }
        if (title === void 0) { title = this._defaults.title; }
        this.setLabels(message, title);
        console.log("in activate");
        var promise = new Promise(function (resolve) {
            _this.show(resolve);
        });
        return promise;
    };
    ConfirmComponent.prototype.show = function (resolve) {
        var _this = this;
        document.onkeyup = null;
        var negativeOnClick = function (e) { return resolve(false); };
        var positiveOnClick = function (e) { return resolve(true); };
        if (!this._confirmElement || !this._cancelButton || !this._okButton) {
            return;
        }
        this._confirmElement.style.opacity = 0;
        this._confirmElement.style.zIndex = 9999;
        this._cancelButton.onclick = (function (e) {
            e.preventDefault();
            if (!negativeOnClick(e)) {
                _this.hideDialog();
            }
        });
        this._okButton.onclick = (function (e) {
            e.preventDefault();
            if (!positiveOnClick(e)) {
                _this.hideDialog();
            }
        });
        this._confirmElement.onclick = function () {
            _this.hideDialog();
            return negativeOnClick(null);
        };
        // document.onkeyup = (e: any) => {
        //   if (e.which === KEY_ESC) {
        //     this.hideDialog();
        //     return negativeOnClick(null);
        //   }
        // };
        this._confirmElement.style.opacity = 1;
        this._confirmElement.style.display = 'block';
    };
    ConfirmComponent.prototype.hideDialog = function () {
        var _this = this;
        document.onkeyup = null;
        this._confirmElement.style.opacity = 0;
        window.setTimeout(function () { return _this._confirmElement.style.zIndex = -1; }, 400);
    };
    ConfirmComponent.prototype.ngOnInit = function () {
        this._confirmElement = document.getElementById('confirmationModal');
        this._cancelButton = document.getElementById('cancelButton');
        this._okButton = document.getElementById('okButton');
    };
    ConfirmComponent = __decorate([
        core_1.Component({
            selector: 'app-confirm',
            styles: ["\n        .custom-modal-container {\n            padding: 30px;\n        }\n\n        .custom-modal-header {\n            background-color: #219161;\n            color: #fff;\n            -webkit-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            -moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);\n            margin-top: -15px;\n            margin-bottom: 40px;\n        }\n    "],
            template: "\n  <div id=\"confirmationModal\" class=\"modal fade custom-modal-container\" role=\"dialog\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\" style=\"background-color: #f5f5f5\">\n        <h4 class=\"modal-title\" >{{title}} <i class=\"fa fa-question-circle\" aria-hidden=\"true\" style=\"height: 18px;width: 22px;color: teal\"></i> </h4>\n      </div>\n       <div class=\"modal-body\">\n        <p>{{message}}</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" id=\"cancelButton\">{{cancelText}}</button>\n        <button type=\"button\" class=\"btn btn-primary\" id=\"okButton\">{{okText}}</button>\n      </div>\n    </div>\n  </div>\n</div>\n  "
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [confirm_service_1.ConfirmService])
    ], ConfirmComponent);
    return ConfirmComponent;
}());
exports.ConfirmComponent = ConfirmComponent;
//# sourceMappingURL=confirm.component.js.map