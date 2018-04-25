import { Component } from '@angular/core';
import { MyFormControl } from './my-form-control';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  control;
  isRequired = false;

  constructor() {
    this.control = new MyFormControl('abc', [Validators.maxLength(5)]);
  }

  toggleRequired() {
    this.isRequired = !this.isRequired;
  }
}
