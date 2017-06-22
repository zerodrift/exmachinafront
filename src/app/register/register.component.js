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
///<reference path="../../../node_modules/@angular/forms/src/model.d.ts"/>
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var user_1 = require("../_models/user");
var forms_1 = require("@angular/forms");
var registration_async_validator_1 = require("./registration-async.validator");
var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService, fb, validator) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.fb = fb;
        this.validator = validator;
        this.model = new user_1.User(); //any = {};
        this.loading = false;
        this.formErrors = {
            'firstName': 'Enter a first name',
            'email': 'Email is taken'
        };
        this.validationMessages = {
            'firstName': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.',
                'forbiddenName': 'Someone named "Bob" cannot be a hero.'
            },
            'email': {
                'required': 'Power is required.'
            }
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        //called after the constructor and called  after the first ngOnChanges()
        this.signUpForm = this.fb.group({
            firstName: [this.model.firstname, forms_1.Validators.required],
            lastName: [this.model.lastname, forms_1.Validators.required],
            login: [this.model.login, forms_1.Validators.required],
            // 'email': [this.model.email, [Validators.required, cachingAsyncValidatorFactory((value) =>
            //     this.userService.getUser(value).map((valid: string) => valid ))]],
            email: [this.model.email, [forms_1.Validators.required, this.validator.emailAvailability]],
            password: [this.model.email, forms_1.Validators.required]
        });
        this.signUpForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    RegisterComponent.prototype.onValueChanged = function (data) {
        console.log("onvaluechanged");
        if (!this.signUpForm) {
            return;
        }
        var form = this.signUpForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        // console.log("this.model is : " + this.model);
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'register-cmp',
        templateUrl: 'register.component.html',
        providers: [registration_async_validator_1.default]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService,
        forms_1.FormBuilder,
        registration_async_validator_1.default])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map