import { Component } from '@angular/core';
import { City } from './city.model';
import { CitiesService } from 'src/app/core/services/cities.service';
import { Country } from '../countries/country.model';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
})
export class CitiesComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  cities: City[] = [];
  countries: Country[] = [];
  newCity: City = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.index();
    this.getAllCountries();
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
  extractErrorMessage(error: any): string {
    let errorMessage = 'An error occurred';
    if (error && error.error && error.error.errors) {
      errorMessage = Object.values(error.error.errors).flat().join(', ');
    }
    return errorMessage;
  }
  addCity(): void {
    this.citiesService.store(this.newCity).subscribe(
      () => {
        this.index();
        this.newCity = {};
        this.successMessage = 'City added successfully!';
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
    this.citiesService.index(this.currentPage).subscribe((data: any) => {
      this.cities = data.data;
      this.currentPage = data.meta.current_page;
      this.totalPages = data.meta.last_page;
    });
  }

  getAllCountries() {
    this.citiesService.getAllCountries().subscribe((data) => {
      this.countries = Object.values(data)[0];
      // console.log(this.countries);
    });
  }

  deleteCity(id: number | undefined): void {
    if (!id) return;
    this.citiesService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'City deleted successfully!';
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

  editCity(id: number | undefined): void {
    this.citiesService.update({ id, ...this.newCity }).subscribe(
      () => {
        this.index();
        this.newCity = {};
        this.successMessage = 'City updated successfully!';
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
