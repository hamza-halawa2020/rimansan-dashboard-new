import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainSlider } from './mainSlider.model';
import { MainSlidersService } from 'src/app/core/services/main-sliders.service';

@Component({
  selector: 'app-main-sliders',

  templateUrl: './main-sliders.component.html',
  styleUrl: './main-sliders.component.scss',
})
export class MainSlidersComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  selectedFile: File | null = null;
  mainSliders: MainSlider[] = [];
  newMainSlider: MainSlider = {};
  successMessage: string = '';
  errorMessage: string = '';
  image = environment.imgUrl + 'main-sliders/';

  constructor(private mainSlidersService: MainSlidersService) {}

  ngOnInit(): void {
    this.index();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // console.log('File selected:', this.selectedFile);
    }
  }

  toggleStatus(data: any): void {
    const formData = new FormData();

    const updatedStatus = data.status === 'active' ? 'inactive' : 'active';

    formData.append('status', updatedStatus);

    this.mainSlidersService.update(data.id, formData).subscribe(
      () => {
        data.status = updatedStatus;
        this.successMessage = 'data status updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating data status', error);
        this.errorMessage =
          'Error updating data status: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  extractErrorMessage(error: any): string {
    let errorMessage = 'An error occurred';
    if (error && error.error && error.error.errors) {
      errorMessage = Object.values(error.error.errors).flat().join(', ');
    }
    return errorMessage;
  }
  addMainSlider(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('title', this.newMainSlider.title || '');
    formData.append('description', this.newMainSlider.description || '');
    formData.append('link', this.newMainSlider.link || '');
    formData.append('status', 'active');

    this.mainSlidersService.store(formData).subscribe(
      () => {
        this.successMessage = 'MainSlider added successfully!';
        this.index();
        this.newMainSlider = {};
        this.selectedFile = null;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error adding mainSlider', error);
        this.errorMessage = 'Failed to add mainSlider.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.mainSlidersService
      .adminIndex(this.currentPage)
      .subscribe((response: any) => {
        this.mainSliders = response.data;
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

  deleteMainSlider(id: number | undefined): void {
    if (!id) return;
    this.mainSlidersService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'MainSlider deleted successfully!';
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

  editMainSlider(id: number | undefined): void {
    // console.log('Data being passed before update:', id);

    if (!id) {
      this.errorMessage = 'Invalid banner ID';
      // console.error('Invalid banner ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.newMainSlider.title) {
      formData.append('title', this.newMainSlider.title);
    }
    if (this.newMainSlider.description) {
      formData.append('description', this.newMainSlider.description);
    }
    if (this.newMainSlider.link) {
      formData.append('link', this.newMainSlider.link);
    }

    this.mainSlidersService.update(id, formData).subscribe(
      () => {
        this.successMessage = 'MainSlider updated successfully!';
        this.index();
        this.newMainSlider = {};
        this.selectedFile = null;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating mainSlider', error);
        this.errorMessage =
          this.extractErrorMessage(error) || 'Failed to update mainSlider.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
