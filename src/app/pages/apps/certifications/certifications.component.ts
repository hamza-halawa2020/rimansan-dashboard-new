import { Component } from '@angular/core';
import { Certificate } from './certificate.model';
import { CertificationsService } from 'src/app/core/services/certifications.service';
import { environment } from 'src/environments/environment';
import { User } from '../user/user.model';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  totalPages: number = 0;
  image = environment.imgUrl + 'Certifications/';
  currentPage: number = 1;
  certificates: Certificate[] = [];
  users: User[] = [];
  newCertificate: Certificate = {};
  successMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;
  constructor(private certificatesService: CertificationsService) {}

  ngOnInit(): void {
    this.index();
    this.getAllUsers();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
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
  addCertificate(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('serial_number', this.newCertificate.serial_number || '');
    formData.append('user_id', this.newCertificate.user_id || '');

    this.certificatesService.store(formData).subscribe(
      () => {
        this.index();
        this.newCertificate = {};
        this.successMessage = 'Certificate added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error adding vity', error);
        this.errorMessage =
          'Failed to add certificate' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.certificatesService
      .index(this.currentPage)
      .subscribe((response: any) => {
        this.certificates = response.data;
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

  getAllUsers() {
    this.certificatesService.getAllUsers().subscribe((data) => {
      this.users = Object.values(data)[0];
      // console.log(this.certificates);
    });
  }

  deleteCertificate(id: number | undefined): void {
    if (!id) return;
    this.certificatesService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Certificate deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error deleting certificate', error);
        this.errorMessage =
          'Failed to delete certificate' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editCertificate(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Invalid banner ID';
      // console.error('Invalid banner ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.newCertificate.serial_number) {
      formData.append('serial_number', this.newCertificate.serial_number);
    }

    if (this.newCertificate.user_id) {
      formData.append('user_id', this.newCertificate.user_id);
    }
    this.certificatesService.update(id, formData).subscribe(
      () => {
        this.index();
        this.newCertificate = {};
        this.successMessage = 'Certificate updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating certificate', error);
        this.errorMessage =
          'Error updating certificate' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
