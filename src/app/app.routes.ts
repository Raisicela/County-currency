import { Routes } from '@angular/router';
import { ListComponent } from './domain/countries/pages/list/list.component';
import { CurrencyDetailComponent } from './domain/currencies/pages/currency-detail/currency-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'currency',
    component: CurrencyDetailComponent,
  },
];
