import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() tabTypes!: Array<string>;
  @Output() searchFilter = new EventEmitter<string>();
  @Output() newTypeEvent = new EventEmitter<string[]>();

  typeFilter: string[] = [];

  onSearch(value: string) {
    this.searchFilter.emit(value);
  }

  onCheckType(e: Event) {
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.typeFilter.length === this.tabTypes.length) {
        this.typeFilter = [];
        this.typeFilter.push(target.value);
      } else {
        this.typeFilter.push(target.value);
      }
    } else {
      if (this.typeFilter.includes(target.value)) {
        this.typeFilter = this.typeFilter.filter((e) => e != target.value);
      } else {
        this.typeFilter.push(target.value);
      }
    }

    if (this.typeFilter.length === 0) {
      this.typeFilter = [...this.tabTypes];
    }

    this.newTypeEvent.emit(this.typeFilter);
  }
}
