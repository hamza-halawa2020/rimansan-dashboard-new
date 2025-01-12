import { Component } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { Category } from '../categories/category.model';
import { Tag } from '../tags/tag.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Post } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  posts: Post[] = [];
  categories: Category[] = [];
  selectedFile: File | null = null;
  image = environment.imgUrl + 'posts/';
  tags: Tag[] = [];
  addNewPost: Post = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private PostsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.index();
    this.getAllCategories();
    this.getAllTags();
  }

  onFileSelected(post: any): void {
    const file = post.target.files[0];
    if (file) {
      this.selectedFile = file;
      // console.log('File selected:', this.selectedFile);
    }
  }
  extractErrorMessage(error: any): string {
    let errorMessage = 'An error occurred';
    if (error && error.error && error.error.errors) {
      errorMessage = Object.values(error.error.errors).flat().join(', ');
    }
    return errorMessage;
  }

  getAllCategories() {
    this.PostsService.getAllCategories().subscribe((data) => {
      this.categories = Object.values(data)[0];
      // console.log(this.countries);
    });
  }

  getAllTags() {
    this.PostsService.getAllTags().subscribe((data) => {
      this.tags = Object.values(data)[0];
      // console.log(this.countries);
    });
  }

  addPost(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('category_id', this.addNewPost.category_id || '');
    formData.append('tag_id', this.addNewPost.tag_id || '');
    formData.append('title', this.addNewPost.title || '');
    formData.append('content', this.addNewPost.content || '');

    this.PostsService.store(formData).subscribe(
      () => {
        this.index();
        this.addNewPost = {};
        this.successMessage = 'Post added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error: any) => {
        console.error('Failed to add Post', error);
        this.errorMessage =
          'Failed to add Post. ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.PostsService.index().subscribe((data) => {
      this.posts = Object.values(data)[0];
      // console.log(this.posts);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.index();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.index();
    }
  }

  deletePost(id: number | undefined): void {
    if (!id) return;
    this.PostsService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Post deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error deleting Post', error);
        this.errorMessage =
          'Failed to delete Post' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editPost(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Invalid post ID';
      // console.error('Invalid post ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.addNewPost.category_id) {
      formData.append('category_id', this.addNewPost.category_id || '');
    }
    if (this.addNewPost.tag_id) {
      formData.append('tag_id', this.addNewPost.tag_id || '');
    }

    if (this.addNewPost.title) {
      formData.append('title', this.addNewPost.title || '');
    }

    if (this.addNewPost.content) {
      formData.append('content', this.addNewPost.content || '');
    }

    this.PostsService.update(id, formData).subscribe(
      () => {
        this.index();
        this.addNewPost = {};
        this.successMessage = 'Post updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating Post:', error);
        this.errorMessage =
          'Error updating Post: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  toggleStatus(post: any): void {
    const formData = new FormData();

    const updatedPost = post.certifications == '1' ? '0' : '1';

    formData.append('certifications', updatedPost);

    this.PostsService.update(post.id, formData).subscribe(
      () => {
        post.certifications = updatedPost;
        this.successMessage = 'Post status updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating Post status', error);
        this.errorMessage =
          'Error updating Post status: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
