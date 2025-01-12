import { Component } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { Category } from '../categories/category.model';
import { Tag } from '../tags/tag.model';
import { environment } from 'src/environments/environment';
import { Event } from './event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  events: Event[] = [];
  categories: Category[] = [];
  selectedFile: File | null = null;
  image = environment.imgUrl + 'events/';
  tags: Tag[] = [];
  addNewEvent: Event = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private EventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.index();
    this.getAllCategories();
    this.getAllTags();
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

  getAllCategories() {
    this.EventsService.getAllCategories().subscribe((data) => {
      this.categories = Object.values(data)[0];
      // console.log(this.countries);
    });
  }

  getAllTags() {
    this.EventsService.getAllTags().subscribe((data) => {
      this.tags = Object.values(data)[0];
      // console.log(this.countries);
    });
  }

  addEvent(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('category_id', this.addNewEvent.category_id || '');
    formData.append('tag_id', this.addNewEvent.tag_id || '');
    formData.append('title', this.addNewEvent.title || '');
    formData.append('content', this.addNewEvent.content || '');

    this.EventsService.store(formData).subscribe(
      () => {
        this.index();
        this.addNewEvent = {};
        this.successMessage = 'Event added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error: any) => {
        console.error('Failed to add Event', error);
        this.errorMessage =
          'Failed to add Event. ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.EventsService.index().subscribe((data) => {
      this.events = Object.values(data)[0];
      // console.log(this.events);
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

  deleteEvent(id: number | undefined): void {
    if (!id) return;
    this.EventsService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Event deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error deleting Event', error);
        this.errorMessage =
          'Failed to delete Event' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editEvent(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Invalid banner ID';
      // console.error('Invalid banner ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.addNewEvent.category_id) {
      formData.append('category_id', this.addNewEvent.category_id || '');
    }
    if (this.addNewEvent.tag_id) {
      formData.append('tag_id', this.addNewEvent.tag_id || '');
    }

    if (this.addNewEvent.title) {
      formData.append('title', this.addNewEvent.title || '');
    }

    if (this.addNewEvent.content) {
      formData.append('content', this.addNewEvent.content || '');
    }

    this.EventsService.update(id, formData).subscribe(
      () => {
        this.index();
        this.addNewEvent = {};
        this.successMessage = 'Event updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating Event:', error);
        this.errorMessage =
          'Error updating Event: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  toggleStatus(event: any): void {
    const formData = new FormData();

    const updatedEvent = event.certifications == '1' ? '0' : '1';

    formData.append('certifications', updatedEvent);

    this.EventsService.update(event.id, formData).subscribe(
      () => {
        event.certifications = updatedEvent;
        this.successMessage = 'Event status updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        console.error('Error updating Event status', error);
        this.errorMessage =
          'Error updating Event status: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
