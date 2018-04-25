import { Component } from '@angular/core';
import { MyFormControl } from './my-form-control';
import { Validators, MinLengthValidator } from '@angular/forms';

const myMinLengthValidator = minlength => {
  const x = function (control) {
    const realValidatorFn = Validators.minLength(minlength);
    return realValidatorFn(control);
  };

  (<any>x).validatorType = MinLengthValidator;
  (<any>x).minlength = minlength;

  return x;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  control;
  xyz;
  isRequired = false;

  constructor() {
    this.control = new MyFormControl('abc', [myMinLengthValidator(5)]);
    this.xyz = new MyFormControl('xyz', []);
  }

  toggleRequired() {
    this.isRequired = !this.isRequired;
  }
}
