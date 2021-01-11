import { getTestBed, TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../models/posts.model';
import { environment } from 'src/environments/environment';

describe('PostsService', () => {
  let service: PostsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let post={ 
    "id": "4",
   "title": "Coding JavaScript Applications",
   "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
   "category": "Coding"
 }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[PostsService]
    });
    injector = getTestBed();
    service = injector.get(PostsService);
    httpMock = injector.get(HttpTestingController);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getalldata', () => {
    const mockdata:Post[] =[{
      "id": "4",
      "title": "Coding JavaScript Applications",
      "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
      "category": "Coding"
    }]
    
    service.getPosts().subscribe((data) => {
      
      expect(data.length).toEqual(1)
 
      expect(data).toEqual(mockdata)
    });
    const req = httpMock.expectOne(environment.mockURL+'books');
    expect(req.request.method).toBe("GET");
    req.flush(mockdata);
  });


  it('getalldata request failure', () => {
    let error: string;
   
    service.getPosts().subscribe(null,e => {
      error = e;
    });
    const req = httpMock.expectOne(environment.mockURL+'books');
    expect(req.request.method).toBe("GET");
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
      expect(error).toBeTruthy();

  });

  it("should call delete API", () => {
    let id = 1;
    service.deletePost(id.toString()).subscribe();
    let req = httpMock.expectOne({
      method: "DELETE",
      url: environment.mockURL + `books/${id}`
    });

    expect(req).toBeDefined();
  });

  it("should throw error when delete API fails", () => {
    let error: string;
    let id = 2;
    service.deletePost(id.toString()).subscribe(null, e => {
      error = e;
    });

    let req = httpMock.expectOne({
      method: "DELETE",
      url: environment.mockURL +`books/${id}`
    });
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error).toBeTruthy();
  });

  it("should call POST API to create a new item", () => {

    service.addPost(post).subscribe();

    let req = httpMock.expectOne({ method: "POST", url: environment.mockURL+'books' });
    expect(req.request.body).toEqual(post);
  });

  
  it("should throw error when POST API fails", () => {
    let error: string;
      service.addPost(post).subscribe(null, e => {
      error = e;
    });

    let req = httpMock.expectOne({
      method: "POST",
      url: environment.mockURL +`books`
    });
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error).toBeTruthy();
  });

  it("should call patch API to update an item", () => {

    let returnedItem={ 
      "title": "Coding JavaScript Applications",
      "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
      "category": "Coding"
      }  
    service.updatePost(post).subscribe();

    let req = httpMock.expectOne({
      method: "PUT",
      url: environment.mockURL+'books'+`/${post.id}`
    });
    expect(req.request.body).toEqual(returnedItem);
  });

  it("should throw error when PUT API fails", () => {
    let error: string;
      service.updatePost(post).subscribe(null, e => {
      error = e;
    });

    let req = httpMock.expectOne({
      method: "PUT",
      url: environment.mockURL +`books`+`/${post.id}`
    });
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error).toBeTruthy();
  });
});
