///<reference path="../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import {User} from "../_models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import RegistrationValidator from "./registration-async.validator";
import { cachingAsyncValidatorFactory } from './asyncvalidator.factory';

@Component({
    moduleId: module.id.toString(),
    selector: 'register-cmp',
    templateUrl: 'register.component.html',
    providers: [RegistrationValidator]
})


export class RegisterComponent implements OnInit {
    model: User = new User();//any = {};
    public loading = false;

    public signUpForm: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        public fb: FormBuilder,
        private validator: RegistrationValidator) {

    }

    ngOnInit(){
        //called after the constructor and called  after the first ngOnChanges()
        this.signUpForm = this.fb.group({
            firstName: [this.model.firstname, Validators.required],
            lastName: [this.model.lastname, Validators.required],
            login: [this.model.login, Validators.required],//, validator.checkUsername],
            // 'email': [this.model.email, [Validators.required, cachingAsyncValidatorFactory((value) =>
            //     this.userService.getUser(value).map((valid: string) => valid ))]],
            email: [this.model.email, [Validators.required, this.validator.emailAvailability]],
            password: [this.model.email, Validators.required]
        });

        this.signUpForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

    }



    onValueChanged(data?: any) {
        console.log("onvaluechanged");
        if (!this.signUpForm) { return; }
        const form = this.signUpForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    register() {
        this.loading = true;
        // console.log("this.model is : " + this.model);
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }


    formErrors = {
        'firstName': 'Enter a first name',
        'email': 'Email is taken'
    };

    validationMessages = {
        'firstName': {
            'required':      'Name is required.',
            'minlength':     'Name must be at least 4 characters long.',
            'maxlength':     'Name cannot be more than 24 characters long.',
            'forbiddenName': 'Someone named "Bob" cannot be a hero.'
        },
        'email': {
            'required': 'Power is required.'
        }
    };
}
