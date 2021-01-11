import { Component, OnInit } from '@angular/core';
import { Post } from './../../models/posts.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { ModalService } from 'src/app/_modal/modal.service';
import { addPost, deletePost, loadPosts, updatePost } from '../state/posts.actions';
import { getPosts } from '../state/posts.selector';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  createForm: FormGroup;
  editForm: FormGroup;
  showActions: Observable<boolean>;
 
  posts: Observable<Post[]>;
  courseToBeUpdated: Post;
  isUpdateActivated = false;
  isAddActivated = false;

  constructor(private store: Store<AppState>,private formBuilder: FormBuilder,private modalService: ModalService) {
    this.createForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      category:['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
    this.showActions = this.store.select(isAuthenticated);
  }

  onDeletePost(id: string) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deletePost({ id }));
    }
  }
  showUpdateForm(course: Post) {
    this.courseToBeUpdated = {...course};

    this.isUpdateActivated = true;
  }
  showAddForm(){
    this.isAddActivated=!this.isAddActivated;
  }
  onSubmit() {
    this.isAddActivated=false;

    const post: Post = {
      id: uuid.v4(), 
      title: this.createForm.value.title,
       description: this.createForm.value.description,
       category:this.createForm.value.category};
      this.store.dispatch(addPost({ post }));
      this.createForm.reset();

  }
  openModal(id: string) {
    this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    updateCourse() {

    const title = this.courseToBeUpdated.title;
    const description = this.courseToBeUpdated.description;
    const category = this.courseToBeUpdated.category;
    const id = this.courseToBeUpdated.id;
    const post: Post = {
      id: id,
      title,
      description,
      category
    };
 
    this.store.dispatch(updatePost({ post }));

      this.isUpdateActivated = false;
      this.courseToBeUpdated = null;
    }

}
