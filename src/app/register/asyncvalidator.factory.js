"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Subscription_1 = require("rxjs/Subscription");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var Rx_1 = require("rxjs/Rx");
exports.cachingAsyncValidatorFactory = function (service) {
    console.log("caching async validator reached");
    var subscription = Subscription_1.Subscription.EMPTY;
    var sampler = new Subject_1.Subject();
    var validationCache = new ReplaySubject_1.ReplaySubject(1, undefined, Rx_1.Scheduler.async);
    var samplerCache = new ReplaySubject_1.ReplaySubject(1);
    sampler.bufferCount(2, 1).subscribe(samplerCache);
    sampler.next(null); // prime/invalidate 'samplerCache' with a dummy value
    return function (input) {
        subscription.unsubscribe();
        return Observable_1.Observable.create(function (observer) {
            subscription = Observable_1.Observable.timer(400).flatMap(function () {
                console.log("value is : " + input.value);
                sampler.next(input.value);
                return samplerCache.first().flatMap(function (sample) {
                    if (sample[0] == sample[1]) {
                        return validationCache.first();
                    }
                    else {
                        // introduce side effect via do() by piggybacking on service call result
                        return service(sample[1]).do(function (value) {
                            validationCache.next(value); // cache successfull result into validationCache
                        }, function () {
                            sampler.next(null); // invalidate samplerCache due to service error
                        });
                    }
                });
            }).subscribe(observer);
            return function () { return subscription.unsubscribe(); };
        });
    };
};
exports.asyncValidatorFactory = function (service) {
    console.log("caching async validator reached");
    var subscription = Subscription_1.Subscription.EMPTY;
    return function (input) {
        subscription.unsubscribe();
        return Observable_1.Observable.create(function (observer) {
            subscription = Observable_1.Observable.timer(400).flatMap(function () { return service(input.value); }).subscribe(observer);
            return function () { return subscription.unsubscribe(); };
        });
    };
};
//# sourceMappingURL=asyncvalidator.factory.js.map