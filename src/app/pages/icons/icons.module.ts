import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Roue
import { IconsRoutingModule } from './icons-routing.module';

// Component
import { BootstrapComponent } from './bootstrap/bootstrap.component';

@NgModule({
  declarations: [BootstrapComponent],
  imports: [CommonModule, IconsRoutingModule],
})
export class IconsModule {}
