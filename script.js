let navInventory = document.getElementById("nav-inventory");
let navOrders = document.getElementById("nav-orders");
let navSettings = document.getElementById("nav-settings");
navInventory.addEventListener("click", function () {
  event.preventDefault();
  document.querySelector(".inventory-page").style.display = "block";
  document.querySelector(".orders-page").style.display = "none";
  document.querySelector(".settings-page").style.display = "none";
});
navOrders.addEventListener("click", function () {
  event.preventDefault();
  document.querySelector(".inventory-page").style.display = "none";
  document.querySelector(".orders-page").style.display = "block";
  document.querySelector(".settings-page").style.display = "none";
});
navSettings.addEventListener("click", function () {
  event.preventDefault();
  document.querySelector(".inventory-page").style.display = "none";
  document.querySelector(".orders-page").style.display = "none";
  document.querySelector(".settings-page").style.display = "block";
});
//INVENTORY
let books = JSON.parse(localStorage.getItem("books")) || [];
let bookList = document.getElementById("book-list");
let currentEditingBook = null;
books.forEach(function (book) {
  renderBookRow(book);
});
function renderBookRow(book) {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>${book.price}</td>
    <td>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>
    `;
  bookList.appendChild(newRow);
  let editButton = newRow.querySelector(".edit");
  let deleteButton = newRow.querySelector(".delete");
  editButton.addEventListener("click", function () {
    event.preventDefault();
    editBook(book, newRow);
  });
  deleteButton.addEventListener("click", function () {
    event.preventDefault();
    deleteBook(book, newRow);
  });
}
let addModal = document.getElementById("add-modal");
let openAddBtn = document.getElementById("open-add-modal");
let cancelAddBtn = document.getElementById("cancel-add");
let saveNewBtn = document.getElementById("save-add");

openAddBtn.addEventListener("click", function () {
  addModal.classList.add("active");
});

cancelAddBtn.addEventListener("click", function () {
  addModal.classList.remove("active");
});

saveNewBtn.addEventListener("click", function () {
  let title = document.getElementById("add-title").value;
  let author = document.getElementById("add-author").value;
  let isbn = document.getElementById("add-isbn").value;
  let price = document.getElementById("add-price").value;

  if (
    title.trim() === "" ||
    author.trim() === "" ||
    isbn.trim() === "" ||
    price.trim() === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  let newBook = { title, author, isbn, price };
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  renderBookRow(newBook);
  addModal.classList.remove("active");
  title.value = "";
  author.value = "";
  isbn.value = "";
  price.value = "";
});

function editBook(book, targetedRow) {
  currentEditingBook = book;
  let modal = document.getElementById("edit-modal");
  modal.classList.add("active");
  let editTitle = document.getElementById("edit-title");
  let editAuthor = document.getElementById("edit-author");
  let editIsbn = document.getElementById("edit-isbn");
  let editPrice = document.getElementById("edit-price");
  editTitle.value = book.title;
  editAuthor.value = book.author;
  editIsbn.value = book.isbn;
  editPrice.value = book.price;
  let saveButton = document.getElementById("save-edit");
  saveButton.onclick = function (event) {
    event.preventDefault();
    book.title = editTitle.value;
    book.author = editAuthor.value;
    book.isbn = editIsbn.value;
    book.price = editPrice.value;
    localStorage.setItem("books", JSON.stringify(books));
    if (
      book.title.trim() === "" ||
      book.author.trim() === "" ||
      book.isbn.trim() === "" ||
      book.price.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }
    targetedRow.querySelector("td:nth-child(1)").textContent = book.title;
    targetedRow.querySelector("td:nth-child(2)").textContent = book.author;
    targetedRow.querySelector("td:nth-child(3)").textContent = book.isbn;
    targetedRow.querySelector("td:nth-child(4)").textContent = book.price;
    currentEditingBook = null;
    modal.classList.remove("active");
  };
  let cancelButton = document.getElementById("cancel-edit");
  cancelButton.onclick = function (event) {
    event.preventDefault();
    currentEditingBook = null;
    modal.classList.remove("active");
  };
}
function deleteBook(book, targetedRow) {
  let modal = document.getElementById("delete-modal");
  modal.classList.add("active");
  let confirmButton = document.getElementById("confirm-delete");
  confirmButton.onclick = function (event) {
    event.preventDefault();
    books.splice(books.indexOf(book), 1);
    localStorage.setItem("books", JSON.stringify(books));
    targetedRow.remove();
    modal.classList.remove("active");
  };
  let cancelButton = document.getElementById("cancel-delete");
  cancelButton.onclick = function (event) {
    event.preventDefault();
    modal.classList.remove("active");
  };
}

//ORDERS
let orders = JSON.parse(localStorage.getItem("orders")) || [
  {
    transactionId: "12345",
    customerName: "John Doe",
    bookTitle: "The Great Gatsby",
    orderDate: "2022-01-01",
    status: "Pending",
  },
];
let orderslist = document.getElementById("orders-list");
orders.forEach(function (order) {
  renderOrderRow(order);
});

function renderOrderRow(order) {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${order.transactionId}</td>
    <td>${order.customerName}</td>
    <td>${order.bookTitle}</td>
    <td>${order.orderDate}</td>
    <td>${order.status}</td>
    <td>
        <button class="ship-btn">Mark as Shipped</button>
    </td>
    `;
  orderslist.appendChild(newRow);
  let shipButton = newRow.querySelector(".ship-btn");
  shipButton.addEventListener("click", function () {
    order.status = "Shipped";
    newRow.querySelector("td:nth-child(5)").textContent = order.status;
    localStorage.setItem("orders", JSON.stringify(orders));
  });
}
