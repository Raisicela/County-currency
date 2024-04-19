import { Component, inject, signal } from '@angular/core';
import { Country } from '../../model/country.model';
import { CommonModule } from '@angular/common';
import { CountryModalComponent } from '../../components/country-modal/country-modal.component';
import { CountriesService } from '../../services/countries.service';

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
  private countriesService = inject(CountriesService);
  countries = signal<Country[]>([]);

  async fetchData() {
    const countries = await this.countriesService.getAllCountries();
    console.log(countries);
    this.countries.set(countries);
  }
  ngOnInit() {
    this.fetchData();
  }

  async deleteCountry(index: string) {
    // await alert('Seguro, desea borrar este país');
    const selected = confirm('Seguro, desea borrar este país?');
    if (selected) {
      await this.countriesService.deleteCountry({ id: index });
      this.fetchData();
    }
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

  updateList() {
    this.fetchData();
  }
}
