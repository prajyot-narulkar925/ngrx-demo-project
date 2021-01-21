import { moduleMetadata } from '@storybook/angular';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {HeaderComponent} from './header.component';
import {ThemeService } from 'src/app/theme/theme.service';
import { StoreModule } from '@ngrx/store';
// import { appReducer } from 'src/app/store/app.state';
import { User } from './../../models/user.model';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/auth/state/auth.effects';
import { appReducer } from 'src/app/store/app.state';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Header Component',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        // StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forRoot(appReducer),
        HttpClientModule
        // RouterModule.forRoot([{
        //   path: 'auth',
        //   loadChildren: () => import('./../../auth/auth.module').then((m) => m.AuthModule),
        // }],
        // {useHash:true})
      ],
      // providers:[ThemeService,{
      //   provide:APP_BASE_HREF,useValue:'/'
      // }]
    }),
  ],
} as Meta;


// const user = {
//   id:'1',email:'test@test.com',firstname:'test',lastname:'test',password:'123456'
// }

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  component: HeaderComponent,
  props: args,
});

export const header = Template.bind({});
header.args = {
  authenticated :false,
};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {
//   authenticated:false
// };
