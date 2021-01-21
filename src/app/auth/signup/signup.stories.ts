import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {SignupComponent} from './signup.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'Signup Component',
  component: SignupComponent,
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

const Template: Story<SignupComponent> = (args: SignupComponent) => ({
  component: SignupComponent,
  props: args,
});

export const signupForm = Template.bind({});
signupForm.args = {
  
};

export const signupFormValidations = Template.bind({});
signupFormValidations.args = {
  submitted: true
};
