import { AfterViewInit, Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BookTableDataSource } from './book-table-datasource';
import { Book } from '../model/Book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Book>;
  @Input() books: Book[]
  dataSource: BookTableDataSource;
  @Output() deleteEvent = new EventEmitter<{ id: string, fast: boolean }>()

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['originalTitle', 'picture', 'action'];

  constructor(private bookService: BookService) {
    this.dataSource = new BookTableDataSource([]);
  }

  ngOnInit() {
    this._refreshBooks(this.books);
  }

  ngOnChanges(changes: SimpleChanges) {
    this._refreshBooks([...changes.books.currentValue])
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  _refreshBooks(books: Book[]) {
    this.dataSource.books = books;
  }

  deleteBook(bookId: string) {
    this.deleteEvent.emit({ id: bookId, fast: false })
  }

  fastDeleteBook(bookId: string) {
    this.deleteEvent.emit({ id: bookId, fast: true })
  }
}
