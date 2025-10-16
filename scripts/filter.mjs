import { displayBooks, books } from './poetry-books.mjs';

const newBooks = document.querySelector('#new');
const oldBooks = document.querySelector("#old");
const saleBooks = document.querySelector("#sale");
const allBooks = document.querySelector("#all");

newBooks.addEventListener("click", () => {
  displayBooks(books.filter(book => {
    const year = parseInt(book.volumeInfo.publishedDate?.substring(0, 4)) || 0;
    return year > 2019;
  }));
});

oldBooks.addEventListener("click", () => {
  displayBooks(books.filter(book => {
    const year = parseInt(book.volumeInfo.publishedDate?.substring(0, 4)) || 0;
    return year <= 2019;
  }));
});

saleBooks.addEventListener("click", () => {
  displayBooks(books.filter(book => book.saleInfo && book.saleInfo.listPrice));
});

allBooks.addEventListener("click", () => {
  displayBooks(books);
});
