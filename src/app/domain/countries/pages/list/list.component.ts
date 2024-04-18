import { Component, signal } from '@angular/core';
import { Country } from '../../model/country.model';
import { CommonModule } from '@angular/common';
import { CountryModalComponent } from '../../components/country-modal/country-modal.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CountryModalComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  showModal = false;
  selectedCountry?: Country = undefined;

  countries = signal<Country[]>([
    {
      id: '1',
      name: 'Argentina',
      code: 'AR',
    },
    {
      id: '2',
      name: 'Panama',
      code: 'PN',
    },
    {
      id: '3',
      name: 'United State',
      code: 'US',
    },
  ]);

  deleteCountry(index: number) {
    this.countries.update((countries) =>
      countries.filter((country, position) => position !== index)
    );
  }

  toggleModal(event: string) {
    this.showModal = !this.showModal;
  }

  addNewCountry() {
    this.showModal = true;
    this.selectedCountry = undefined;
  }

  editCountry(country: Country) {
    this.showModal = true;
    this.selectedCountry = country;
  }
}
