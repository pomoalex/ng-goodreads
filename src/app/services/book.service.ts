import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../model/Book';
import { retry, catchError } from 'rxjs/operators';
import { ObservableInput, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse): ObservableInput<Book[]> {
    if (error.error instanceof ErrorEvent) {
      console.log("An error occured: ${error.error.message}")
    } else {
      console.error("Backend returned error: ${error.status}",
        "with body: ${eror.error}")
    }
    return throwError("Oops, everything is wrong :(")
  }

  fetchBooks() {
    return this.httpClient.get<Book[]>("/books", httpOptions).pipe(retry(3), catchError(this.handleError))
  }

  removeBook(id:string){
    return this.httpClient.delete<Book[]>(`/books/${id}`, httpOptions).pipe(retry(3), catchError(this.handleError))
  }
}
