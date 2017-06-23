///<reference path="../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, NgModule, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import {User} from "../_models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import RegistrationValidator from "./registration-login-async.validator";

@Component({
    moduleId: module.id.toString(),
    selector: 'register-cmp',
    templateUrl: 'register.component.html',
    // providers: [RegistrationValidator]
})


export class RegisterComponent implements OnInit {
    model: User = new User();//any = {};
    public loading = false;

    public signUpForm: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        public fb: FormBuilder) {
        this.model = new User();

    }

    ngOnInit(){
        //called after the constructor and called  after the first ngOnChanges()
        this.model = new User();//any = {};
        this.signUpForm = this.fb.group({
            firstname: [this.model.firstname, Validators.compose([Validators.required, Validators.maxLength(50)])],
            lastname: [this.model.lastname, Validators.compose([Validators.required, Validators.maxLength(50)])],
            login: [this.model.login, [Validators.required]],
            email: [this.model.email, Validators.compose([Validators.required, Validators.email])],
            password: [this.model.email, Validators.required]
        });
    }

    register() {
        this.loading = true;
        console.log("this.signUpForm.value is : " + JSON.stringify(JSON.stringify(this.signUpForm.value)));
        console.log("this.model is : " + JSON.stringify(JSON.stringify(this.model)));
        this.userService.create(this.signUpForm.value)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    console.log("saved successfully!");
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    console.log("didn't save successfully: " + error.toString());
                });
    }


    // formErrors = {
    //     'firstName': 'Enter a first name',
    //     'email': 'Email is taken'
    // };
    //
    // validationMessages = {
    //     'firstName': {
    //         'required':      'Name is required.',
    //         'minlength':     'Name must be at least 4 characters long.',
    //         'maxlength':     'Name cannot be more than 24 characters long.',
    //         'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    //     },
    //     'email': {
    //         'required': 'Power is required.'
    //     }
    // };
}
