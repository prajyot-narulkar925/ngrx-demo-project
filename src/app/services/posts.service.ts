import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.mockURL +`books`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      environment.mockURL +`books`,
      post
    );
  }

  updatePost(post: Post) {
    const changes = {
      title:post.title,
      description:post.description,
      category:post.category
    }
    return this.http.put(environment.mockURL +'books/' + post.id, changes);

  }

  deletePost(id: string) {
    return this.http.delete(
      environment.mockURL +'books/' + id
    );
  }


}
