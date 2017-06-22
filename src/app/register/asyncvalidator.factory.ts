import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Scheduler} from "rxjs/Rx";
import {Observer} from "rxjs/Observer";
/**
 * Created by jisaac1 on 6/20/17.
 */

/*
take from here: https://github.com/angular/angular/issues/6895
 */

type AsyncValidatorFactory = (service: (value: any) => Observable<any | null>) => AsyncValidatorFn;

export const cachingAsyncValidatorFactory: AsyncValidatorFactory = (service: (value: any) => Observable<any | null>): AsyncValidatorFn => {
    console.log("caching async validator reached")
    let subscription: Subscription = Subscription.EMPTY;
    const sampler = new Subject<any>();
    const validationCache = new ReplaySubject<any>(1, undefined, Scheduler.async);
    const samplerCache = new ReplaySubject<any>(1)
    sampler.bufferCount(2, 1).subscribe(samplerCache);
    sampler.next(null); // prime/invalidate 'samplerCache' with a dummy value
    return (input: AbstractControl) => {
        subscription.unsubscribe();
        return Observable.create((observer: Observer<any | null>) => {
            subscription = Observable.timer(400).flatMap(() => {
                console.log("value is : " + input.value);
                sampler.next(input.value);
                return samplerCache.first().flatMap((sample: [any, any]) => {
                    if (sample[0] == sample[1]) {
                        return validationCache.first();
                    } else {
                        // introduce side effect via do() by piggybacking on service call result
                        return service(sample[1]).do((value) => {
                            validationCache.next(value) // cache successfull result into validationCache
                        }, () => {
                            sampler.next(null); // invalidate samplerCache due to service error
                        });
                    }
                })
            }).subscribe(observer);
            return () => subscription.unsubscribe();
        });
    };
};

export const asyncValidatorFactory: AsyncValidatorFactory = (service: (value: any) => Observable<any | null>): AsyncValidatorFn => {
    console.log("caching async validator reached")
    let subscription: Subscription = Subscription.EMPTY;
    return (input: AbstractControl) => {
        subscription.unsubscribe();
        return Observable.create((observer: Observer<any | null>) => {
            subscription = Observable.timer(400).flatMap(() => service(input.value)).subscribe(observer);
            return () => subscription.unsubscribe();
        });
    };
};
