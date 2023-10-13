import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Output() searchFilter = new EventEmitter<string>();

  onSearch(value: string) {
    this.searchFilter.emit(value);
  }
}
