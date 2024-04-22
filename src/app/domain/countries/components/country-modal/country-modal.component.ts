import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { Country } from '../../model/country.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-modal.component.html',
  styleUrl: './country-modal.component.css',
})
export class CountryModalComponent {
  private countriesService = inject(CountriesService);
  editCountry = signal<Country>({ id: '', name: '', code: '' });
  @Input() showModal: boolean = false;
  @Input() country?: Country = undefined;
  @Output()
  toggleModal = new EventEmitter();
  @Output() updateList = new EventEmitter();

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editCountry.set({ ...this.editCountry(), name: input.value });
  }

  updateCode(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editCountry.set({ ...this.editCountry(), code: input.value });
  }

  toggleModalHandler() {
    this.toggleModal.emit();
  }

  async saveChanges() {
    if (this.editCountry().id) {
      console.log('actualizar Country', this.editCountry());
      await this.countriesService.updateCountry({
        id: this.editCountry().id,
        name: this.editCountry().name,
        code: this.editCountry().code,
      });
    } else {
      console.log('Create Country', this.editCountry());
      await this.countriesService.create({
        name: this.editCountry().name,
        code: this.editCountry().code,
      });
    }
    this.showModal = false;
    this.updateList.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.country) {
      console.log(this.country);
      this.editCountry.set(this.country!);
    } else {
      this.editCountry.set({ id: '', name: '', code: '' });
    }
  }
}
