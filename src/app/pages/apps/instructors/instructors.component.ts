import { Component } from '@angular/core';
import { InstructorsService } from 'src/app/core/services/instructors.service';
import { environment } from 'src/environments/environment';
import { Instructor } from './instructor.model';
@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.scss',
})
export class InstructorsComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  instructors: Instructor[] = [];
  selectedFile: File | null = null;
  image = environment.imgUrl + 'instructors/';
  addNewInstructor: Instructor = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private InstructorsService: InstructorsService) {}

  ngOnInit(): void {
    this.index();
  }

  onFileSelected(instructor: any): void {
    const file = instructor.target.files[0];
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

  addInstructor(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('name', this.addNewInstructor.name || '');
    formData.append('email', this.addNewInstructor.email || '');
    formData.append('phone', this.addNewInstructor.phone || '');
    formData.append('job_title', this.addNewInstructor.job_title || '');
    formData.append('description', this.addNewInstructor.description || '');

    this.InstructorsService.store(formData).subscribe(
      () => {
        this.index();
        this.addNewInstructor = {};
        this.successMessage = 'Instructor added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error: any) => {
        console.error('Failed to add Instructor', error);
        this.errorMessage =
          'Failed to add Instructor. ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.InstructorsService.index().subscribe((data) => {
      this.instructors = Object.values(data)[0];
      // console.log(this.instructors);
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

  deleteInstructor(id: number | undefined): void {
    if (!id) return;
    this.InstructorsService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Instructor deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error deleting Instructor', error);
        this.errorMessage =
          'Failed to delete Instructor' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editInstructor(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Invalid banner ID';
      // console.error('Invalid banner ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.addNewInstructor.name) {
      formData.append('name', this.addNewInstructor.name || '');
    }
    if (this.addNewInstructor.email) {
      formData.append('email', this.addNewInstructor.email || '');
    }
    if (this.addNewInstructor.phone) {
      formData.append('phone', this.addNewInstructor.phone || '');
    }
    if (this.addNewInstructor.job_title) {
      formData.append('job_title', this.addNewInstructor.job_title || '');
    }
    if (this.addNewInstructor.description) {
      formData.append('description', this.addNewInstructor.description || '');
    }
    this.InstructorsService.update(id, formData).subscribe(
      () => {
        this.index();
        this.addNewInstructor = {};
        this.successMessage = 'Instructor updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating Instructor:', error);
        this.errorMessage =
          'Error updating Instructor: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
