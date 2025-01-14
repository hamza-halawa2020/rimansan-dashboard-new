import { Component } from '@angular/core';
import { Social } from './social.model';
import { SocialLinksService } from 'src/app/core/services/social-links.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  image = environment.imgUrl + 'socials/';

  totalPages: number = 0;
  currentPage: number = 1;
  socialLinks: Social[] = [];
  newSocialLink: Social = {};
  successMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;

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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // console.log('File selected:', this.selectedFile);
    }
  }

  addSocialLink(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('icon', this.selectedFile);
    formData.append('name', this.newSocialLink.name || '');
    formData.append('url', this.newSocialLink.url || '');

    this.socialLinksService.store(formData).subscribe(
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
    if (!id) {
      this.errorMessage = 'Invalid banner ID';
      // console.error('Invalid banner ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('icon', this.selectedFile);
    }
    if (this.newSocialLink.name) {
      formData.append('name', this.newSocialLink.name || '');
    }
    if (this.newSocialLink.url) {
      formData.append('url', this.newSocialLink.url || '');
    }

    this.socialLinksService.update(id, formData).subscribe(
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
