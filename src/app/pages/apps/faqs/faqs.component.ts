import { Component } from '@angular/core';
import { Faq } from './faq.model';
import { FaqsService } from 'src/app/core/services/faqs.service';

@Component({
  selector: 'app-faqs',

  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  faqs: Faq[] = [];
  newFaqs: Faq = {};
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private faqsService: FaqsService) {}

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

  addFaqs(): void {
    this.faqsService.store(this.newFaqs).subscribe(
      () => {
        this.successMessage = 'Faqs added successfully!';
        this.index();
        this.newFaqs = {};
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error adding faqs', error);
        this.errorMessage = 'Failed to add faqs.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.faqsService.index(this.currentPage).subscribe((response: any) => {
      this.faqs = response.data;
      this.currentPage = response.meta.current_page;
      this.totalPages = response.meta.last_page;
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

  deleteFaqs(id: number | undefined): void {
    if (!id) return;
    this.faqsService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Faqs deleted successfully!';
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

  editFaqs(id: number | undefined): void {
    this.faqsService.update({ id, ...this.newFaqs }).subscribe(
      () => {
        this.successMessage = 'Faqs updated successfully!';
        this.index();
        this.newFaqs = {};
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating faqs', error);
        this.errorMessage =
          this.extractErrorMessage(error) || 'Failed to update faqs.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
