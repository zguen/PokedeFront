import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() tabTypes!: Array<string>;
  @Input() tabGenerations!: Array<string>;
  @Output() searchFilter = new EventEmitter<string>();
  @Output() newTypeEvent = new EventEmitter<string[]>();
  @Output() newGenerationEvent = new EventEmitter<string[]>();
  isAdmin: boolean = false;

  typeFilter: string[] = [];
  generationFilter: string[] = [];

  constructor(private masterService: MasterService) {}

  ngOnInit() {
    this.masterService.getMasterProfil().subscribe((master) => {
      this.isAdmin = master.admin;
    });
  }

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

  onCheckGeneration(e: Event) {
    //recupérer la valeur de la checkbox et son etat
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      if (this.generationFilter.length === this.tabGenerations.length) {
        this.generationFilter = [];
        this.generationFilter.push(target.value);
      } else {
        this.generationFilter.push(target.value);
      }
    } else {
      if (this.generationFilter.includes(target.value)) {
        this.generationFilter = this.generationFilter.filter(
          (e) => e != target.value
        );
      } else {
        this.generationFilter.push(target.value);
      }
    }

    if (this.generationFilter.length === 0) {
      this.generationFilter = [...this.tabGenerations];
    }

    this.newGenerationEvent.emit(this.generationFilter);
  }
}
