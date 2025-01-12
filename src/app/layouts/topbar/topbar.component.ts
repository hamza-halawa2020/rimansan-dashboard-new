import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/core/services/language.service';
import { RootReducerState, getLayoutMode } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { changeMode } from 'src/app/store/actions/layout-action';
import { Profile } from 'src/app/pages/extrapages/profile/profile.model';
import { environment } from 'src/environments/environment';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

// Topbar Component
export class TopbarComponent {
  userInfo!: Profile;
  image = environment.imgUrl + 'users/';
  country: any;
  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  element: any;
  mode: string | undefined;
  fullscreenicon: any = 'arrows-maximize';
  @Output() mobileMenuButtonClicked = new EventEmitter();
  constructor(
    @Inject(DOCUMENT) private document: any,
    public languageService: LanguageService,
    private store: Store<RootReducerState>,
    public _cookiesService: CookieService,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.show();

    this.element = document.documentElement;
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter((x) => x.lang === this.cookieValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = 'assets/images/flags/us.svg';
      }
      this.countryName = 'English';
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }

  show() {
    this.userService.profile().subscribe((data) => {
      this.userInfo = Object.values(data)[0];
      // console.log(this.userInfo);
    });
  }

  /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'sp' },
    { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'gr' },
    { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
    { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
    { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
    { text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr' },
    { text: 'Arabic', flag: 'assets/images/flags/ae.svg', lang: 'ar' },
  ];

  windowScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      (document.getElementById('back-to-top') as HTMLElement).style.display =
        'block';
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      (document.getElementById('back-to-top') as HTMLElement).style.display =
        'none';
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open');
    document.body.classList.contains('twocolumn-panel')
      ? document.body.classList.remove('twocolumn-panel')
      : document.body.classList.add('twocolumn-panel');
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.mode = mode;
    this.store.dispatch(changeMode({ mode }));
    this.store.select(getLayoutMode).subscribe((mode) => {
      document.documentElement.setAttribute('data-bs-theme', mode);
      document.documentElement.classList.remove('mode-auto');
    });
    if (mode == 'auto') {
      this.store.select(getLayoutMode).subscribe((mode) => {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        document.documentElement.classList.add('mode-auto');
      });
    }
  }
}
