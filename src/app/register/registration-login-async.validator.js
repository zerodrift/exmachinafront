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
require("rxjs/Rx");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var user_service_1 = require("../_services/user.service");
var RegistrationLoginValidator = RegistrationLoginValidator_1 = (function () {
    function RegistrationLoginValidator(userService) {
        var _this = this;
        this.userService = userService;
        this._emailTimeout = null;
        // loginValidator(c: AbstractControl)
        // {
        //     return this.userService.getUserByLogin(c.value).map(response =>
        //     {
        //         if(response == true)
        //         {
        //             return { customerExists: true };
        //         }
        //         else
        //         {
        //             return;
        //         }
        //     });
        // }
        this.loginAvailability = function (control) {
            clearTimeout(_this._emailTimeout);
            return new Promise(function (resolve, reject) {
                _this._emailTimeout = setTimeout(function () {
                    _this.userService.getUserByLogin(control.value)
                        .subscribe(function (response) {
                        resolve({ loginTaken: true });
                    }, function (error) {
                        resolve(null);
                    });
                }, 600);
            });
        };
    }
    RegistrationLoginValidator.prototype.validate = function (control) {
        return this.loginAvailability(control);
    };
    return RegistrationLoginValidator;
}());
RegistrationLoginValidator = RegistrationLoginValidator_1 = __decorate([
    core_1.Directive({
        selector: "[loginValidator]",
        providers: [
            {
                provide: forms_1.NG_ASYNC_VALIDATORS,
                useExisting: core_1.forwardRef(function () { return RegistrationLoginValidator_1; }), multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], RegistrationLoginValidator);
exports.default = RegistrationLoginValidator;
var RegistrationLoginValidator_1;
//# sourceMappingURL=registration-login-async.validator.js.map