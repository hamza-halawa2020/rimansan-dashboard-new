import { Component } from '@angular/core';
import { Product } from './product.model';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/app/core/services/products.service';
import { Router } from '@angular/router';
import { Category } from '../categories/category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  totalPages: number = 0;
  currentPage: number = 1;
  products: Product[] = [];
  categories: Category[] = [];
  selectedFile: any | null = null;
  image = environment.imgUrl + 'products/';
  addNewProduct: Product = {};
  successMessage: string = '';
  errorMessage: string = '';
  constructor(
    private ProductsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.index();
    this.getAllCategories();
  }

  onFileSelected(product: any): void {
    const file = product.target.files;
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
    this.ProductsService.getAllCategories().subscribe((data) => {
      this.categories = Object.values(data)[0];
      // console.log(this.countries);
    });
  }



  addProduct(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image to upload.';
      return;
    }

    const formData = new FormData();

    for (let file of this.selectedFile) {
      formData.append('image[]', file);
    }

    formData.append('title', this.addNewProduct.title || '');
    formData.append('description', this.addNewProduct.description || '');
    formData.append('stock', '1');

    formData.append(
      'priceBeforeDiscount',
      this.addNewProduct.priceBeforeDiscount || ''
    );
    formData.append('discount', this.addNewProduct.discount || '');
    formData.append('category_id', this.addNewProduct.category_id || '');

    this.ProductsService.store(formData).subscribe(
      () => {
        this.index();
        this.addNewProduct = {};
        this.successMessage = 'Product added successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error: any) => {
        // console.error('Failed to add Product', error);
        this.errorMessage =
          'Failed to add Product. ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  index(): void {
    this.ProductsService.index().subscribe((data) => {
      this.products = Object.values(data)[0];
      // console.log(this.products);
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

  deleteProduct(id: number | undefined): void {
    if (!id) return;
    this.ProductsService.delete(id).subscribe(
      () => {
        this.index();
        this.successMessage = 'Product deleted successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error deleting Product', error);
        this.errorMessage =
          'Failed to delete Product' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  editProduct(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Invalid product ID';
      // console.error('Invalid product ID:', id);
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.addNewProduct.category_id) {
      formData.append('category_id', this.addNewProduct.category_id || '');
    }

    if (this.addNewProduct.title) {
      formData.append('title', this.addNewProduct.title || '');
    }

    if (this.addNewProduct.description) {
      formData.append('description', this.addNewProduct.description || '');
    }

    this.ProductsService.update(id, formData).subscribe(
      () => {
        this.index();
        this.addNewProduct = {};
        this.successMessage = 'Product updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating Product:', error);
        this.errorMessage =
          'Error updating Product: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }

  toggleStatus(product: any): void {
    const formData = new FormData();

    const updatedProduct = product.stock == '1' ? '0' : '1';

    formData.append('stock', updatedProduct);

    this.ProductsService.update(product.id, formData).subscribe(
      () => {
        product.stock = updatedProduct;
        this.successMessage = 'Product status updated successfully!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      (error) => {
        // console.error('Error updating Product status', error);
        this.errorMessage =
          'Error updating Product status: ' + this.extractErrorMessage(error);
        setTimeout(() => (this.errorMessage = ''), 3000);
      }
    );
  }
}
