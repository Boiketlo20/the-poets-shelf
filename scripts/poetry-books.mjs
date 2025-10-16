import { addBookToCart } from "./cart.mjs";

const cards = document.querySelector('#cards');
export let books = [];

async function getTrendingBooks() {
  const genre = "poetry"; 
  const apiKey = "AIzaSyBfbXAgbgIlgq4-qmQeyvSY4XPiICw61AM";
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}+lang:en&orderBy=newest&key=${apiKey}&maxResults=20`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const data = await response.json();

    books = data.items;
    displayBooks(books);

  } catch (error) {
    console.error(error.message);
    alert('Oops! Please try again later.');
  }
}

function displayBooks(books) {
  cards.innerHTML = "";

  books.forEach(book => {
    const info = book.volumeInfo;
    const sale = book.saleInfo; 
    const card = document.createElement('section');

    const title = document.createElement('h2');
    title.textContent = info.title;

    const author = document.createElement('p');
    author.textContent = info.authors ? info.authors.join(", ") : "Unknown Author";

    const desc = document.createElement('p');
    const shortDesc = info.description ? info.description.substring(0, 150) + "..." : "No description available.";
    desc.textContent = shortDesc;

    if (info.description && info.description.length > 150) {
      const readMore = document.createElement('span');
      readMore.textContent = " Read more";
      readMore.style.color = "#294C60";
      readMore.style.cursor = "pointer";
      readMore.addEventListener("click", () => openModal(info.title, info.description));
      desc.appendChild(readMore);
    }

    const image = document.createElement('img');
    const imageUrl = (book.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg").replace("http://", "https://");
    image.src = imageUrl;
    image.setAttribute("loading", "lazy");
    image.setAttribute("alt", book.volumeInfo.title);

    const date = document.createElement('p');
    date.textContent = info.publishedDate;

    const price = document.createElement('p');
    if (sale && sale.listPrice) {
    price.textContent = `Price: ${sale.listPrice.amount} ${sale.listPrice.currencyCode}`;
    } else {
    price.textContent = 'NOT FOR SALE';
    }

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(desc);
    card.appendChild(date);
    card.appendChild(image);
    card.appendChild(price);

    if (sale && sale.listPrice) {
      const button = document.createElement('button');
      button.id = 'cart-btn';
      button.textContent = 'Add to Cart';
      button.addEventListener("click", () => addBookToCart(book));
      card.appendChild(button);
    }

    cards.appendChild(card);
  });
}

getTrendingBooks();

// Modal elements
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDesc");
const closeModal = document.querySelector("#closeModal");

function openModal(title, desc) {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

export { displayBooks };