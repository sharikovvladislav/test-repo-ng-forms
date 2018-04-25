import { Directive, DoCheck, Inject, OnInit, Optional, Self } from '@angular/core';
import { MyFormControl } from './my-form-control';
import { NG_VALIDATORS, NgControl, RequiredValidator, MinLengthValidator } from '@angular/forms';

@Directive({
  selector: '[formControl]'
})
export class CustomValidatorsDirective implements DoCheck, OnInit {
  constructor(private ngControl: NgControl,  @Optional() @Self() @Inject(NG_VALIDATORS) private dynamicValidators) {
  }

  ngOnInit() {
    // тут валидаторы из FormControl конструктора
    console.log('reactive validators: ', (<MyFormControl>this.ngControl.control).getValidators());
    // тут лежат валидаторы которые вешаются через шаблон
    console.log('template validators: ', this.dynamicValidators);

    const allValidators = [
      ...(<MyFormControl>this.ngControl.control).getValidators(),
      ...(this.dynamicValidators || [])
    ];

    const hasValidatorOfType = Type => {
      return allValidators.some(
        validator => {
          return validator.hasOwnProperty('validatorType')
            ? validator.validatorType === Type
            : validator instanceof Type;
        }
      );
    };

    const getValidator = Type => {
      let result = null;

      allValidators.forEach(
        validator => {
          const isNeededValidator = validator.hasOwnProperty('validatorType')
            ? validator.validatorType === Type
            : validator instanceof Type;

          result = result || isNeededValidator ? validator : null;
        }
      );

      return result;
    };
    console.log('hasValidatorOfTypeMinLength', hasValidatorOfType(MinLengthValidator));

    const minLengthValidator = getValidator(MinLengthValidator);
    console.log('MinLength validator metadata (minlength value): ', minLengthValidator.minlength)
  }

  ngDoCheck() {
    // тут можно отслеживать состояние в dynamicValidators
    // console.log(this.dynamicValidators[0].required);
  }
}
