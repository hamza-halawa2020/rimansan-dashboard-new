import { Component } from '@angular/core';
import { CountriesService } from 'src/app/core/services/countries.service';
import { Country } from './country.model';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent {
  Countries: Country[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  newCountry: Country = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.index();
  }

  addCountry(): void {
    this.countriesService.store(this.newCountry).subscribe(
      () => {
        this.index();
        this.newCountry = {};
        this.successMessage = 'Country added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error adding country', error);
        this.errorMessage =
          'Failed to add country' + error.error.errors.name[0];
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.countriesService.index().subscribe((data) => {
      this.Countries = Object.values(data)[0];
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

  deleteCountry(id: number | undefined): void {
    if (!id) return;
    this.countriesService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Country deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error deleting country', error);
        this.errorMessage =
          'Failed to delete country' + error.error.errors.name[0];
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editCountry(id: number | undefined): void {
    this.countriesService.update({ id, ...this.newCountry }).subscribe(
      () => {
        this.index();
        this.newCountry = {};
        this.successMessage = 'Country updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating country', error);
        this.errorMessage =
          'Error updating country' + error.error.errors.name[0];
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
