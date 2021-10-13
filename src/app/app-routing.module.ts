import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [
  {
    path: ':polygonid',
    component: PageComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: PageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
