import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ModalModule } from 'src/app/_modal';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  const initialState = {  };
  let store: MockStore;
  let formgroup:FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      imports:[ModalModule,FormsModule,ReactiveFormsModule],
      providers:[ provideMockStore({ initialState }),]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
