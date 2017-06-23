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
var RegistrationEmailValidator = RegistrationEmailValidator_1 = (function () {
    function RegistrationEmailValidator(userService) {
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
        this.emailAvailability = function (control) {
            clearTimeout(_this._emailTimeout);
            return new Promise(function (resolve, reject) {
                _this._emailTimeout = setTimeout(function () {
                    _this.userService.getUserByEmail(control.value)
                        .subscribe(function (response) {
                        resolve({ emailTaken: true });
                    }, function (error) {
                        resolve(null);
                    });
                }, 600);
            });
        };
    }
    RegistrationEmailValidator.prototype.validate = function (control) {
        return this.emailAvailability(control);
    };
    return RegistrationEmailValidator;
}());
RegistrationEmailValidator = RegistrationEmailValidator_1 = __decorate([
    core_1.Directive({
        selector: "[emailValidator]",
        providers: [
            {
                provide: forms_1.NG_ASYNC_VALIDATORS,
                useExisting: core_1.forwardRef(function () { return RegistrationEmailValidator_1; }), multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], RegistrationEmailValidator);
exports.default = RegistrationEmailValidator;
var RegistrationEmailValidator_1;
//# sourceMappingURL=registration-email-async.validator.js.map