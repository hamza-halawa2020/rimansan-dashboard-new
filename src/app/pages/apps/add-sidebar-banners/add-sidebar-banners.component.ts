import { Component } from '@angular/core';
import { SideBarBanner } from './sideBarBanner.model';
import { AddSidebarBannerService } from 'src/app/core/services/add-sidebar-banner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-sidebar-banners',
  templateUrl: './add-sidebar-banners.component.html',
  styleUrl: './add-sidebar-banners.component.scss',
})
export class AddSidebarBannersComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  selectedFile: File | null = null;
  sideBarBanners: SideBarBanner[] = [];
  newSideBarBanner: SideBarBanner = {};
  successMessage: string = '';
  errorMessage: string = '';
  image = environment.imgUrl + 'side-bar/';

  constructor(private sideBarBannersService: AddSidebarBannerService) {}

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

    this.sideBarBannersService.update(data.id, formData).subscribe(
      () => {
        data.status = updatedStatus;
        this.successMessage = 'data status updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating data status', error);
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
  addSideBarBanner(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('link', this.newSideBarBanner.link || '');
    formData.append('status', 'active');

    this.sideBarBannersService.store(formData).subscribe(
      () => {
        this.successMessage = 'SideBarBanner added successfully!';
        this.index();
        this.newSideBarBanner = {};
        this.selectedFile = null;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error adding sidebar banner', error);
        this.errorMessage = 'Failed to add sidebar banner.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.sideBarBannersService
      .adminIndex(this.currentPage)
      .subscribe((response: any) => {
        this.sideBarBanners = response.data;
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

  deleteSideBarBanner(id: number | undefined): void {
    if (!id) return;
    this.sideBarBannersService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'SideBarBanner deleted successfully!';
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

  editSideBarBanner(id: number | undefined): void {
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

    if (this.newSideBarBanner.link) {
      formData.append('link', this.newSideBarBanner.link);
    }

    this.sideBarBannersService.update(id, formData).subscribe(
      () => {
        this.successMessage = 'SideBarBanner updated successfully!';
        this.index();
        this.newSideBarBanner = {};
        this.selectedFile = null;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating sidebar banner', error);
        this.errorMessage =
          this.extractErrorMessage(error) || 'Failed to update sidebar banner.';
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
