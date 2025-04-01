import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from 'src/app/core/services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
})
export class TranslateComponent implements OnInit {
  translates: { ar: { [key: string]: string }; en: { [key: string]: string } } =
    { ar: {}, en: {} };
  successMessage: string = '';
  errorMessage: string = '';
  selectedLang: 'ar' | 'en' = 'en';
  newKey: string = '';
  newValue: string = '';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadTranslations();
  }

  // loadTranslations(): void {
  //   this.translateService.getTranslations().subscribe({
  //     next: (data) => {
  //       this.translates = data || { ar: {}, en: {} };
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.error('Error loading translations:', err);
  //       this.errorMessage = `Failed to load translations: ${err.status} - ${err.message}`;
  //     },
  //   });
  // }

  loadTranslations(): void {
    this.translateService.getTranslations().subscribe({
        next: (data:any) => {
            // التأكد من إن البيانات متعرفة وفيها ar و en
            if (data && data.translations) {
                this.translates = {
                    ar: data.translations.ar || {},
                    en: data.translations.en || {}
                };
            } else {
                this.translates = { ar: {}, en: {} }; // قيمة افتراضية لو الـ API رجع حاجة غلط
            }
            console.log('Loaded translations:', this.translates);
        },
        error: (err: HttpErrorResponse) => {
            console.error('Error loading translations:', err);
            this.errorMessage = `Failed to load translations: ${err.status} - ${err.message}`;
            this.translates = { ar: {}, en: {} }; // قيمة افتراضية في حالة الخطأ
        },
    });
}


  addTranslate(): void {
    if (this.newKey && this.newValue) {
      this.translates[this.selectedLang][this.newKey] = this.newValue;
      this.updateTranslations();
      this.newKey = '';
      this.newValue = '';
    }
  }

  deleteTranslate(key: string): void {
    delete this.translates[this.selectedLang][key];
    this.updateTranslations();
  }

  updateTranslations(): void {
    this.translateService
      .update(this.selectedLang, this.translates[this.selectedLang])
      .subscribe({
        next: () => {
          this.successMessage = 'Translations updated successfully!';
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = 'Failed to update translations: ' + err.message;
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
  }

  downloadFile(lang: 'ar' | 'en'): void {
    window.open(`${environment.i18nUrl}${lang}.json`, '_blank'); // Still uses static URL for download
  }
}
