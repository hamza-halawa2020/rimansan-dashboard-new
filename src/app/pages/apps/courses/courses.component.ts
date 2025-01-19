import { Component } from '@angular/core';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from './course.model';
import { Category } from '../categories/category.model';
import { Tag } from '../tags/tag.model';
import { Instructor } from '../instructors/instructor.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  courses: Course[] = [];
  categories: Category[] = [];
  selectedFile: File | null = null;
  image = environment.imgUrl + 'Courses/';
  tags: Tag[] = [];
  instructors: Instructor[] = [];
  addNewCourse: Course = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private CoursesService: CoursesService) {}

  ngOnInit(): void {
    this.index();
    this.getAllCategories();
    this.getAllTags();
    this.getAllInstructors();
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
    this.CoursesService.getAllCategories().subscribe((data) => {
      this.categories = Object.values(data)[0];
      // console.log(this.countries);
    });
  }

  getAllTags() {
    this.CoursesService.getAllTags().subscribe((data) => {
      this.tags = Object.values(data)[0];
      // console.log(this.countries);
    });
  }
  getAllInstructors() {
    this.CoursesService.getAllInstructors().subscribe((data) => {
      this.instructors = Object.values(data)[0];
      // console.log(this.countries);
    });
  }

  addCourse(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('category_id', this.addNewCourse.category_id || '');
    formData.append('tag_id', this.addNewCourse.tag_id || '');
    formData.append('instructor_id', this.addNewCourse.instructor_id || '');
    formData.append('title', this.addNewCourse.title || '');
    formData.append('description', this.addNewCourse.description || '');
    formData.append('video_url', this.addNewCourse.video_url || '');
    formData.append('price', this.addNewCourse.price || '');
    formData.append(
      'certifications',
      this.addNewCourse.certifications ? '1' : '0'
    );

    this.CoursesService.store(formData).subscribe(
      () => {
        this.index();
        this.addNewCourse = {};
        this.successMessage = 'Course added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error: any) => {
        // console.error('Failed to add Course', error);
        this.errorMessage =
          'Failed to add Course. ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.CoursesService.index().subscribe((data) => {
      this.courses = Object.values(data)[0];
      // console.log(this.courses);
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

  deleteCourse(id: number | undefined): void {
    if (!id) return;
    this.CoursesService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Course deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error deleting Course', error);
        this.errorMessage =
          'Failed to delete Course' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editCourse(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Invalid banner ID';
      // console.error('Invalid banner ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.addNewCourse.category_id) {
      formData.append('category_id', this.addNewCourse.category_id || '');
    }
    if (this.addNewCourse.tag_id) {
      formData.append('tag_id', this.addNewCourse.tag_id || '');
    }
    if (this.addNewCourse.instructor_id) {
      formData.append('instructor_id', this.addNewCourse.instructor_id || '');
    }
    if (this.addNewCourse.title) {
      formData.append('title', this.addNewCourse.title || '');
    }
    if (this.addNewCourse.description) {
      formData.append('description', this.addNewCourse.description || '');
    }
    if (this.addNewCourse.video_url) {
      formData.append('video_url', this.addNewCourse.video_url || '');
    }
    if (this.addNewCourse.price) {
      formData.append('price', this.addNewCourse.price || '');
    }

    this.CoursesService.update(id, formData).subscribe(
      () => {
        this.index();
        this.addNewCourse = {};
        this.successMessage = 'Course updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating Course:', error);
        this.errorMessage =
          'Error updating Course: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  toggleStatus(course: any): void {
    const formData = new FormData();

    const updatedCourse = course.certifications == '1' ? '0' : '1';

    formData.append('certifications', updatedCourse);

    this.CoursesService.update(course.id, formData).subscribe(
      () => {
        course.certifications = updatedCourse;
        this.successMessage = 'Course status updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating Course status', error);
        this.errorMessage =
          'Error updating Course status: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
