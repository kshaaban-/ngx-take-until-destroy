var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Subject } from 'rxjs/Subject';
/**
 *
 * @param value
 * @returns {boolean}
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 *
 * @param destroyMethodName
 */
export function TakeUntilDestroy(destroyMethodName) {
    if (destroyMethodName === void 0) { destroyMethodName = 'ngOnDestroy'; }
    return function (constructor) {
        var originalDestroy = constructor.prototype[destroyMethodName];
        if (!isFunction(originalDestroy)) {
            console.warn(constructor.name + " is using @TakeUntilDestroy but does not implement " + destroyMethodName);
        }
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *
                 * @type {Subject<any>}
                 * @private
                 */
                _this._takeUntilDestroy$ = new Subject();
                return _this;
            }
            Object.defineProperty(class_1.prototype, "destroyed$", {
                /**
                 *
                 * @returns {Observable<boolean>}
                 */
                get: function () {
                    this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
                    return this._takeUntilDestroy$.asObservable();
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Call the super destroyMethodName method and clean the observers
             */
            class_1.prototype[destroyMethodName] = function () {
                isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
                this._takeUntilDestroy$.next(true);
                this._takeUntilDestroy$.complete();
            };
            return class_1;
        }(constructor));
    };
}
//# sourceMappingURL=take-until-destory.js.map