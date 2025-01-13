import { Component } from '@angular/core';
import { Social } from './social.model';
import { SocialLinksService } from 'src/app/core/services/social-links.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent {


  totalPages: number = 0;
  currentPage: number = 1;
  socialLinks: Social[] = [];
  newSocialLink: Social = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private socialLinksService: SocialLinksService) {}

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
  addSocialLink(): void {
    this.socialLinksService.store(this.newSocialLink).subscribe(
      () => {
        this.index();
        this.newSocialLink = {};
        this.successMessage = 'SocialLink added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error adding vity', error);
        this.errorMessage =
          'Failed to add city' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.socialLinksService.index().subscribe((data) => {
      this.socialLinks = Object.values(data)[0];
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

  deleteSocialLink(id: number | undefined): void {
    if (!id) return;
    this.socialLinksService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'SocialLink deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error deleting city', error);
        this.errorMessage =
          'Failed to delete city' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editSocialLink(id: number | undefined): void {
    this.socialLinksService.update({ id, ...this.newSocialLink }).subscribe(
      () => {
        this.index();
        this.newSocialLink = {};
        this.successMessage = 'SocialLink updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating city', error);
        this.errorMessage =
          'Error updating city' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
