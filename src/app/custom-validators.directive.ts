import { Directive, DoCheck, Inject, OnInit, Optional, Self } from '@angular/core';
import { MyFormControl } from './my-form-control';
import { NG_VALIDATORS, NgControl } from '@angular/forms';

@Directive({
  selector: '[formControl]'
})
export class CustomValidatorsDirective implements DoCheck, OnInit {
  constructor(private ngControl: NgControl,  @Optional() @Self() @Inject(NG_VALIDATORS) private dynamicValidators) {
  }

  ngOnInit() {
    // тут валидаторы из FormControl конструктора
    console.log((<MyFormControl>this.ngControl.control).getValidators());
    // тут лежат валидаторы которые вешаются через шаблон
    console.log('dynamicValidators', this.dynamicValidators);
  }

  ngDoCheck() {
    // тут можно отслеживать состояние в dynamicValidators
    console.log(this.dynamicValidators[0].required);
  }
}
