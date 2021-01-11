import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from './../_modal/modal.module';
import { StoreModule } from '@ngrx/store';
import { POST_STATE_NAME } from './state/posts.selector';
import { postsReducer } from './state/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts.effects';



const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
];

@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    ModalModule
    ]
})
export class PostModule { }
