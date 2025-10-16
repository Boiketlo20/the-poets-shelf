let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Adding the books in the cart
export function addBookToCart(book){
   const exists = cart.some(item => item.id === book.id);
  if (!exists) {
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${book.volumeInfo.title}" added to your cart!`);
  } else {
    alert("This book is already in your cart.");
  }
}

//Removing a book from the cart
export function removeFromCart(bookId){
  cart = cart.filter(book => book.id !== bookId);
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Get the carts total sum
export function getTotal() {
  return cart.reduce((sum, book) => {
    const price = book.saleInfo?.listPrice?.amount || 0;
    return sum + price;
  }, 0);
}


/// 🔹 Display cart items (for cart.html)
export function displayCart() {
  const cartContainer = document.querySelector(".product-list");
  const cartMessage = document.querySelector("#cart-message");
  const footer = document.querySelector(".cart-footer");
  const totalText = document.querySelector(".cart-total");

  cartContainer.innerHTML = "";
  totalText.innerHTML = "";

  if (!cart.length) {
    cartMessage.textContent = "Your cart is empty 🛒";
    footer.classList.add("hide");
    return;
  }

  cartMessage.textContent = "";

  cart.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}" alt="${book.volumeInfo.title}">
      <h3>${book.volumeInfo.title}</h3>
      <p>${book.saleInfo?.listPrice ? book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode : "Price not available"}</p>
      <button data-id="${book.id}" class="remove-btn">Remove</button>
    `;
    cartContainer.appendChild(li);
  });

  footer.classList.remove("hide");
  totalText.textContent = "Total: R" + getTotal().toFixed(2);

  // Enable removing
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      removeFromCart(e.target.dataset.id);
      displayCart(); // refresh display
    });
  });
}

// If this page is cart.html, display the cart
if (document.body.contains(document.querySelector(".product-list"))) {
  displayCart();
}