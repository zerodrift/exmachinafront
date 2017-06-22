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
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
require("rxjs/Rx");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var user_service_1 = require("../_services/user.service");
var RegistrationValidator = RegistrationValidator_1 = (function () {
    function RegistrationValidator(userService, http) {
        var _this = this;
        this.userService = userService;
        this.http = http;
        this._emailTimeout = null;
        this.emailAvailability = function (control) {
            clearTimeout(_this._emailTimeout);
            return new Promise(function (resolve, reject) {
                _this._emailTimeout = setTimeout(function () {
                    _this.userService.getUser(control.value)
                        .subscribe(function (response) {
                        console.log("reponse is: " + JSON.stringify(response));
                        resolve(null);
                    }, function (error) {
                        console.log("no reponse is: " + error.toString());
                        resolve({ taken: true });
                    });
                }, 600);
            });
        };
        this.validateUniqueEmailPromise = function (control) {
            return new Promise(function (resolve, reject) {
                control
                    .valueChanges
                    .debounceTime(400)
                    .flatMap(function (value) { return _this.userService.getUser(value); })
                    .subscribe(function (data) {
                    if (data.length == 0 || data.length == 1) {
                        console.log("data was full, email taken: " + data.value());
                        resolve(null);
                    }
                    else {
                        console.log("data was empty but result was ok is " + data.value());
                        resolve({ emailFound: true });
                    }
                }, function (err) {
                    console.log("err is " + err.value());
                    resolve({ emailFound: false });
                });
            });
        };
    }
    RegistrationValidator.prototype.validate = function (control) {
        return this.emailAvailability(control);
    };
    return RegistrationValidator;
}());
RegistrationValidator = RegistrationValidator_1 = __decorate([
    core_1.Directive({
        selector: "[asyncValidator][formControlName], [asyncValidator][ngModel]",
        providers: [
            {
                provide: forms_1.NG_ASYNC_VALIDATORS,
                useExisting: core_1.forwardRef(function () { return RegistrationValidator_1; }), multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, http_1.Http])
], RegistrationValidator);
exports.default = RegistrationValidator;
var RegistrationValidator_1;
//# sourceMappingURL=registration-async.validator.js.map