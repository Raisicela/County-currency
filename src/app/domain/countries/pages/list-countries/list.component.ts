import { Component, inject, signal } from '@angular/core';
import { Country } from '../../model/country.model';
import { CommonModule } from '@angular/common';
import { CountryModalComponent } from '../../components/country-modal/country-modal.component';
import { CountriesService } from '../../services/countries.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CountryModalComponent, NavbarComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  // para el modal
  showModal = false;
  selectedCountry?: Country = undefined;

  countries = signal<Country[]>([]);
  private countriesService = inject(CountriesService);

  async fetchData() {
    const countries = await this.countriesService.getAll();
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
      // this.fetchData();

      this.countries.set(
        this.countries().filter((country) => country.id !== index)
      );
    }
  }

  updateList() {
    this.fetchData();
  }

  toggleModal(event: string) {
    this.showModal = !this.showModal;
  }

  clickAddNewCountryBtn() {
    this.showModal = true;
    this.selectedCountry = undefined;
  }

  clickEditCountryBtn(country: Country) {
    this.showModal = true;
    this.selectedCountry = country;
  }
}
