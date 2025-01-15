import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Count To
import { CountUpModule } from 'ngx-countup';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

//  Drag and drop
import { DndModule } from 'ngx-drag-drop';

// chart
import { NgApexchartsModule } from 'ng-apexcharts';

// Drag-Drop
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';

// Bootstrap Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AlertModule } from 'ngx-bootstrap/alert';

// Page Route
import { AppsRoutingModule } from './apps-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Component
import { ContactsComponent } from './contacts/contacts.component';

// Component
import { UserComponent } from './user/user.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { AddSidebarBannersComponent } from './add-sidebar-banners/add-sidebar-banners.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { ClientsComponent } from './clients/clients.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { AddreesesComponent } from './addreeses/addreeses.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseReviewComponent } from './course-review/course-review.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { FaqsComponent } from './faqs/faqs.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { MainSlidersComponent } from './main-sliders/main-sliders.component';
import { PostsComponent } from './posts/posts.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    ContactsComponent,
    EventsComponent,
    EventDetailsComponent,
    AddSidebarBannersComponent,
    CouponsComponent,
    CoursesComponent,
    CourseReviewComponent,
    TagsComponent,
    UserComponent,
    ClientsComponent,
    PostsComponent,
    PostCommentComponent,
    MainSlidersComponent,
    FaqsComponent,
    CountriesComponent,
    CitiesComponent,
    AddreesesComponent,
    ShipmentsComponent,
    AddSidebarBannersComponent,
    CertificationsComponent,
    CategoriesComponent,
    InstructorsComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductReviewComponent,
    SocialLinksComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    SimplebarAngularModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    FlatpickrModule.forRoot(),
    PaginationModule,
    NgApexchartsModule,
    ProgressbarModule,
    DragDropModule,
    MatTableModule,
    SharedModule,
    DndModule,
    CountUpModule,
    PickerModule,
    AlertModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
})
export class AppsModule {
  constructor() {}
}
