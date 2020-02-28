import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchEvent } from '../model/SearchEvent';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  placeholder: string = "Search.."
  searchEvent: SearchEvent = {searchTerm:""}
  @Output() searchFired = new EventEmitter<{ searchTerm: string }>()

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: string) {
    this.searchEvent.searchTerm = value
  }

  onSearch() {
    this.searchFired.emit(this.searchEvent)
  }
}
