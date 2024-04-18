import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';
import { Country, CreateCountry } from '../../model/country.model';

@Component({
  selector: 'app-country-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-modal.component.html',
  styleUrl: './country-modal.component.css',
})
export class CountryModalComponent {
  @Input() showModal: boolean = false;
  @Input() country?: Country = undefined;
  @Output()
  toggleModal = new EventEmitter();
  editCountry = signal<Country>({ id: '', name: '', code: '' });

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

  saveChanges() {
    if (this.editCountry().id) {
      console.log('actualizar Country', this.editCountry());
    } else {
      console.log('Create Country', this.editCountry());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.country) {
      console.log(this.country);
      this.editCountry.set(this.country!);
    } else {
    }
  }
}
