import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
  input,
  signal,
} from '@angular/core';
import { Currency } from '../../model/currency.model';
import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'app-currency-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-modal.component.html',
  styleUrl: './currency-modal.component.css',
})
export class CurrencyModalComponent {
  private currenciesService = inject(CurrenciesService);
  editCurrency = signal<Currency>({ id: '', symbol: '', code: '' });
  @Input() showModal: boolean = false;
  @Input() currency?: Currency = undefined;
  @Output() toggleModal = new EventEmitter();
  @Output() updateList = new EventEmitter();

  updateSymbol(event: Event) {
    const input1 = event.target as HTMLInputElement;
    this.editCurrency.set({ ...this.editCurrency(), symbol: input1.value });
  }

  updateCode(event: Event) {
    const input2 = event.target as HTMLInputElement;
    this.editCurrency.set({ ...this.editCurrency(), code: input2.value });
  }

  toggleModalHandler() {
    this.toggleModal.emit();
  }

  async saveChanges() {
    if (this.editCurrency().id) {
      await this.currenciesService.updateCurrency({
        id: this.editCurrency().id,
        symbol: this.editCurrency().symbol,
        code: this.editCurrency().code,
      });
    } else {
      await this.currenciesService.createCurrency({
        symbol: this.editCurrency().symbol,
        code: this.editCurrency().code,
      });
    }
    this.showModal = false;
    this.updateList.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.currency) {
      console.log(this.currency);
      this.editCurrency.set(this.currency!);
    } else {
      this.editCurrency.set({ id: '', symbol: '', code: '' });
    }
  }
}
