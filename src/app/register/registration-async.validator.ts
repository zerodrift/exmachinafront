import {Http} from '@angular/http'
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {AppSettings} from '../app.settings'
import {AbstractControl, NG_ASYNC_VALIDATORS, Validator} from "@angular/forms";
import {Directive, forwardRef} from "@angular/core";
import {UserService} from "../_services/user.service";
import {httpFactory} from "@angular/http/src/http_module";

@Directive({
    selector: "[asyncValidator][formControlName], [asyncValidator][ngModel]",
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => RegistrationValidator), multi: true
        }
    ]
})

export default class RegistrationValidator implements Validator {
    private _emailTimeout: any = null;

    constructor(private userService: UserService, private http: Http) {
    }


    validate( control : AbstractControl ) : Promise<{[key : string] : any}>|Observable<{[key : string] : any}> {
        return this.emailAvailability(control);
    }


    emailAvailability = (control: AbstractControl) => {
        clearTimeout(this._emailTimeout);
        return new Promise((resolve, reject) => {
            this._emailTimeout = setTimeout(() => {
                this.userService.getUser(control.value)
                    .subscribe(
                        response    => {
                            console.log("reponse is: " + JSON.stringify(response));
                            resolve(null)
                        },
                        error       => {
                            console.log("no reponse is: " + error.toString());
                            resolve({taken: true})
                        });
            }, 600);
        });
    }

    validateUniqueEmailPromise = ( control: AbstractControl ) => {
        return new Promise((resolve, reject) => {
        control
            .valueChanges
            .debounceTime(400)
            .flatMap(value => this.userService.getUser(value))
                .subscribe(
                data => {
                    if (data.length == 0 || data.length == 1) {
                        console.log("data was full, email taken: " + data.value());
                        resolve(null);
                    } else {
                        console.log("data was empty but result was ok is " + data.value());
                        resolve({ emailFound: true });
                    }
                },
                err => {
                    console.log("err is " + err.value());
                    resolve({ emailFound: false });
                }
            )
        });

    }

}



