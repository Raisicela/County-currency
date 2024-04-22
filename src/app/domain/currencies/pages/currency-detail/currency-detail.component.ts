import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CurrencyModalComponent } from '../../components/currency-model/currency-modal.component';
import { CurrenciesService } from '../../services/currencies.service';
import { Currency } from '../../model/currency.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-detail',
  standalone: true,
  imports: [NavbarComponent, CurrencyModalComponent, CommonModule],
  templateUrl: './currency-detail.component.html',
  styleUrl: './currency-detail.component.css',
})
export class CurrencyDetailComponent {
  private currenciesService = inject(CurrenciesService);
  currencies = signal<Currency[]>([]);
  showModal = false;
  selectedCurrency?: Currency = undefined;

  async fetchData() {
    const currencies = await this.currenciesService.getAll();
    this.currencies.set(currencies);
  }

  ngOnInit() {
    this.fetchData();
  }

  updateList() {
    this.fetchData();
  }

  toggleModal(event: Event) {
    this.showModal = !this.showModal;
  }

  addNewCurrency() {
    this.showModal = true;
    this.selectedCurrency = undefined;
  }

  editCurrency(currency: Currency) {
    this.showModal = true;
    this.selectedCurrency = currency;
  }
  async deleteCurrency(index: string) {
    // await alert('Seguro, desea borrar este país');
    const selected = confirm('Seguro, desea borrar esta moneda?');
    if (selected) {
      await this.currenciesService.deleteCurrency({ id: index });
      // this.fetchData();

      this.currencies.set(
        this.currencies().filter((currency) => currency.id !== index)
      );
    }
  }
}
