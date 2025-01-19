import { Component } from '@angular/core';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from './tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  tags: Tag[] = [];
  newTag: Tag = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.index();
  }
  extractErrorMessage(error: any): string {
    let errorMessage = 'An error occurred';
    if (error && error.error && error.error.errors) {
      errorMessage = Object.values(error.error.errors).flat().join(', ');
    }
    return errorMessage;
  }
  addTag(): void {
    this.tagsService.store(this.newTag).subscribe(
      () => {
        this.index();
        this.newTag = {};
        this.successMessage = 'Tag added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error adding vity', error);
        this.errorMessage =
          'Failed to add city' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.tagsService.index().subscribe((data) => {
      this.tags = Object.values(data)[0];
      // console.log(this.countries);
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

  deleteTag(id: number | undefined): void {
    if (!id) return;
    this.tagsService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Tag deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error deleting city', error);
        this.errorMessage =
          'Failed to delete city' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editTag(id: number | undefined): void {
    this.tagsService.update({ id, ...this.newTag }).subscribe(
      () => {
        this.index();
        this.newTag = {};
        this.successMessage = 'Tag updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating city', error);
        this.errorMessage =
          'Error updating city' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
