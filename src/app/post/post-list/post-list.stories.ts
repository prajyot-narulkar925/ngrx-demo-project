// import {storiesOf, moduleMetadata } from '@storybook/angular';
// import { PostListComponent } from './post-list.component';
// import { Post } from './../../models/posts.model';
// import { ModalModule } from './../../_modal/modal.module';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { AuthEffects } from 'src/app/auth/state/auth.effects';
// import { AuthReducer } from 'src/app/auth/state/auth.reducer';
// import { AUTH_STATE_NAME } from 'src/app/auth/state/auth.selector';
// import { CommonModule } from '@angular/common';
// import { POST_STATE_NAME } from '../state/posts.selector';
// import { postsReducer } from '../state/posts.reducer';
// import { PostsEffects } from '../state/posts.effects';

// // const item:Post = {
// //     title:'test',
// //     description:'description test',
// //     category:'category test'
// // }
// const item:Post[] = [
//   {
//     id: "3",
//     title: "Speaking JavaScript",
//     description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
//     category: "Coding"
//   }]
// storiesOf('post',module).addDecorator(moduleMetadata({
//     declarations:[PostListComponent],
//     imports:[
//         CommonModule,
//         ModalModule,
//         FormsModule,
//         ReactiveFormsModule,
//         // StoreModule.forRoot({'post': postsReducer}),
//         // EffectsModule.forFeature([]),
//         StoreModule.forRoot({}),
// ]   

// })).add('post list',() => {
//     return {
//         // template:'<div >hi</div>',
//         component:PostListComponent,
//         props :{
//           posts : item,
//           isUpdateActivated:false,
//           isAddActivated:false,
//           showActions:false,
//           createForm:{}            
//         }
//     }
// })

import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { PostListComponent } from './post-list.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './../../_modal/modal.module';
import { Post } from 'src/app/models/posts.model';
import { POST_STATE_NAME } from '../state/posts.selector';
import { postsReducer } from '../state/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from '../state/posts.effects';
import { PostsService } from './../../services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
// import { withKnobs, text } from '@storybook/addon-knobs/angular';
import { appReducer } from './../../store/app.state';
import { ThemeService } from 'src/app/theme/theme.service';

export default {
  title: 'PostList Component',
  component: PostListComponent,
  decorators: [
    // withKnobs,
    moduleMetadata({
      declarations: [PostListComponent],
      imports: [
        CommonModule,
        // StoreModule.forFeature(POST_STATE_NAME, postsReducer),
        // EffectsModule.forFeature([PostsEffects]),
        // StoreModule.forRoot(AppState,{}),
        StoreModule.forRoot(appReducer,{}),
        // EffectsModule.forRoot([PostsEffects]),
        ReactiveFormsModule,
        FormsModule,
        ModalModule,
        HttpClientModule
      ],
      providers:[]
    }),
  ],
} as Meta;

// let mockStore:Store;

const Template: Story<PostListComponent> = (args: PostListComponent) => ({
  // moduleMetadata:{
  //   providers:[
  //    { provide:APP_INITIALIZER,

  //   }
  //   ]
  // },
  component: PostListComponent,
  props: args,
});

const mockdata:Post[] = [
  {
    id: "3",
    title: "Speaking JavaScript",
    description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
    category: "Coding"
  },
  {
    id: "4",
    title: "Speaking JavaScript2",
    description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
    category: "Coding"
  }]

export const postList = Template.bind({});
postList.args = {
  posts : mockdata,
  actions:false,
  isUpdateActivated:false,
  isAddActivated:false,
};

export const postListActions = Template.bind({});
postListActions.args = {
  posts : mockdata,
  actions:false,
  isUpdateActivated:false,
  isAddActivated:false,
};
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
// import { StoreModule } from '@ngrx/store';
// import { moduleMetadata, Meta, Story } from '@storybook/angular';
// import { ThemeService } from './../../theme/theme.service';
// import { PostListComponent } from './post-list.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ModalModule } from './../../_modal/modal.module';

// const dataItems = [{
//     id: "3",
//     title: "Speaking JavaScript",
//     description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
//     category: "Coding"
//   },
//   {
//     id: "4",
//     title: "Speaking JavaScript",
//     description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
//     category: "Coding"
//   }]
 
// export default {
//   title: 'Posts',
//   decorators: [
//     moduleMetadata({
//       declarations: [PostListComponent],
//       imports: [CommonModule,
//          StoreModule.forRoot({}),
//          RouterModule,
//           HttpClientModule,
//           ReactiveFormsModule,
//           FormsModule,
//           ModalModule,
//         ],
//         providers:[ThemeService]
//     }),
//   ],
// } as Meta;
 
// const Template: Story<PostListComponent> = (args: PostListComponent) => ({
//   component: PostListComponent,
//   props: args,
// });
 
// export const DefaultPost = Template.bind({});
// DefaultPost.args ={
//   posts : dataItems,
//   showActions: false,
//   isAuthenticated: false
// }