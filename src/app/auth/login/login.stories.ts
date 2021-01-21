import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {LoginComponent} from './login.component';
import { StoreModule } from '@ngrx/store';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Login Component',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        StoreModule.forRoot({}),
        ReactiveFormsModule,
        FormsModule
      ],
      providers:[]
    }),
  ],
} as Meta;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  component: LoginComponent,
  props: args,
});

export const FormEmpty = Template.bind({});

FormEmpty.args = {
};

export const loginFormValidations = Template.bind({});
loginFormValidations.args = {
  submitted: true
};
