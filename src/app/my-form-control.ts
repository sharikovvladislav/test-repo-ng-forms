import {FormControl} from '@angular/forms';

export class MyFormControl extends FormControl {
  private myValidators;

  constructor(formState, validatorOrOpts?, asyncValidators?) {
    super(formState, validatorOrOpts, asyncValidators);

    this.myValidators = validatorOrOpts;
  }

  public getValidators() {
    return this.myValidators;
  }
}
