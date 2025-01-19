import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from './category.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  categories: Category[] = [];
  newCategory: Category = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private categoriesService: CategoriesService) {}

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
  addCategory(): void {
    this.categoriesService.store(this.newCategory).subscribe(
      () => {
        this.index();
        this.newCategory = {};
        this.successMessage = 'Category added successfully!';
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
    this.categoriesService.index().subscribe((data) => {
      this.categories = Object.values(data)[0];
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

  deleteCategory(id: number | undefined): void {
    if (!id) return;
    this.categoriesService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Category deleted successfully!';
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

  editCategory(id: number | undefined): void {
    this.categoriesService.update({ id, ...this.newCategory }).subscribe(
      () => {
        this.index();
        this.newCategory = {};
        this.successMessage = 'Category updated successfully!';
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
