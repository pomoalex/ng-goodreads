import { Component, OnInit } from '@angular/core';
import { Book } from './model/Book'
import { BookService } from './services/book.service'
import { SearchEvent } from './model/SearchEvent'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  full_title: string = 'Angular workshop training app';
  short_title: string = 'Workshop app';
  books: Book[] = []
  flag: boolean = true;
  savedWord: string;
  searchTitle: string;
  buttonStyle = {
    'display': 'none'
  }

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.fetchBooks().subscribe((books) => { this.books = books })
  }

  displayedColumns: string[] = ['title', 'picture']

  onChange(param: string) {
    console.log(param)
  }

  onClick() {
    if (this.buttonStyle.display == 'block')
      this.buttonStyle.display = 'none'
    else this.buttonStyle.display = 'block';
  }

  save(value: string) {
    this.savedWord = value
  }

  updateSearchString(value: string) {
    this.searchTitle = value;
  }

  doSearch(event: SearchEvent) {
    this.searchTitle = event.searchTerm
  }

  deleteBook(event: { id: string, fast: boolean }) {
    if (event.fast == true) {
      this.books = this.books.filter(obj => obj.id != event.id);
      this.bookService.removeBook(event.id).subscribe()
    } else {
      this.bookService.removeBook(event.id).subscribe(() => this.bookService.fetchBooks().subscribe((books) => { this.books = books }));
    }
  }
}
