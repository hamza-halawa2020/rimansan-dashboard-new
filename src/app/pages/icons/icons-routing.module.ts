import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { BootstrapComponent } from './bootstrap/bootstrap.component';

const routes: Routes = [
  {
    path: 'bootstrap',
    component: BootstrapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconsRoutingModule {}
