import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../model/Book'

@Pipe({
  name: 'searchFilter'
})


export class SearchFilterPipe implements PipeTransform {

  transform(books: Book[], title: string): Book[] {
    if (title)
      return books.filter(book => book.originalTitle.toLowerCase().includes(title.toLowerCase()));
    else return books;
  }

}
