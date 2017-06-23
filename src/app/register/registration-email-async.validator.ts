import {Http} from '@angular/http'
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {AppSettings} from '../app.settings'
import {AbstractControl, NG_ASYNC_VALIDATORS, Validator} from "@angular/forms";
import {Directive, forwardRef} from "@angular/core";
import {UserService} from "../_services/user.service";
import {httpFactory} from "@angular/http/src/http_module";

@Directive({
    selector: "[emailValidator]",
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => RegistrationEmailValidator), multi: true
        }
    ]
})

export default class RegistrationEmailValidator implements Validator {
    private _emailTimeout: any = null;

    constructor(private userService: UserService) {
    }


    validate( control : AbstractControl ) : Promise<{[key : string] : any}>|Observable<{[key : string] : any}> {
        return this.emailAvailability(control);
    }

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


    emailAvailability = (control: AbstractControl) => {
        clearTimeout(this._emailTimeout);
        return new Promise((resolve, reject) => {
            this._emailTimeout = setTimeout(() => {
                this.userService.getUserByEmail(control.value)
                    .subscribe(
                        response    => {
                            resolve({emailTaken: true})
                        },
                        error       => {
                            resolve(null)
                        });
            }, 600);
        });
    };

    // validateUniqueEmailPromise = ( control: AbstractControl ) => {
    //     return new Promise((resolve, reject) => {
    //     control
    //         .valueChanges
    //         .debounceTime(400)
    //         .flatMap(value => this.userService.getUserByLogin(value))
    //             .subscribe(
    //             data => {
    //                 if (data.length == 0 || data.length == 1) {
    //                     console.log("data was full, email taken: " + data.value());
    //                     resolve(null);
    //                 } else {
    //                     console.log("data was empty but result was ok is " + data.value());
    //                     resolve({ emailFound: true });
    //                 }
    //             },
    //             err => {
    //                 console.log("err is " + err.value());
    //                 resolve({ emailFound: false });
    //             }
    //         )
    //     });
    //
    // }

}



