// =========================
// REQUEST BOOK
// =========================

function requestBook(bookName) {

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    const newRequest = {
    book: bookName,
    requester: localStorage.getItem("userName") || "Student",
    date: new Date().toLocaleDateString(),
    status: "Pending"
};

    requests.push(newRequest);

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    alert("Borrow request sent for: " + bookName);
}


// =========================
// SEARCH BOOKS
// =========================

function searchBooks() {

    const search =
        document.getElementById("searchBox").value.toLowerCase();

    const books =
        document.querySelectorAll(".book");

    books.forEach(function(book) {

        const text =
            book.innerText.toLowerCase();

        if (text.includes(search)) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }

    });
}


// =========================
// SIGN UP
// =========================

function signup() {

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;

    if (name === "" || email === "" || password === "") {

        alert("Please fill all fields.");

        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Account created successfully!");

    window.location.href = "login.html";
}


// =========================
// LOGIN
// =========================

function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const savedEmail =
        localStorage.getItem("userEmail");

    const savedPassword =
        localStorage.getItem("userPassword");

    if (
        email === savedEmail &&
        password === savedPassword
    ) {

        alert("Login successful!");

        localStorage.setItem("loggedIn", "true");

        window.location.href = "index.html";

    } else {

        alert("Invalid email or password.");

    }
}


// =========================
// ADD BOOK
// =========================

function addBook() {

    const title =
        document.getElementById("bookTitle").value;

    const author =
        document.getElementById("bookAuthor").value;

    const genre =
        document.getElementById("bookGenre").value;

    if (title === "" || author === "" || genre === "") {

        alert("Please fill all fields.");

        return;
    }

    const book = {

        title: title,
        author: author,
        genre: genre

    };

    let books =
        JSON.parse(localStorage.getItem("books")) || [];

    books.push(book);

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

    alert("Book added successfully!");

    window.location.href = "index.html";
}


// =========================
// LOAD BOOKS
// =========================

function loadBooks() {

    const books =
        JSON.parse(localStorage.getItem("books")) || [];

    const bookList =
        document.getElementById("bookList");

    if (!bookList) {
        return;
    }

    books.forEach(function(book) {

        const bookDiv =
            document.createElement("div");

        bookDiv.className = "book";

        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>

            <button onclick="requestBook('${book.title}')">
                Request Book
            </button>
        `;

        bookList.appendChild(bookDiv);

    });
}


// =========================
// SHOW REQUESTS
// =========================

function showRequests() {

    const requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    const requestList =
        document.getElementById("requestList");

    if (!requestList) {
        return;
    }

    requestList.innerHTML = "";

    if (requests.length === 0) {

        requestList.innerHTML =
            "<p>No book requests yet.</p>";

        return;
    }

    requests.forEach(function(request, index) {

        const requestDiv =
            document.createElement("div");

        requestDiv.className = "book";

        requestDiv.innerHTML = `
            <h3>${request.book}</h3>

<p>Requested by: ${request.requester}</p>

<p>Date: ${request.date}</p>

<p>Status: ${request.status}</p>

            ${
    request.status === "Pending"
    ? `
        <button onclick="acceptRequest(${index})">
            Accept
        </button>

        <button onclick="rejectRequest(${index})">
            Reject
        </button>
    `
    : request.status === "Accepted"
    ? `
        <button onclick="openChat()">
            💬 Chat
        </button>
    `
    : ""
}
        `;

        requestList.appendChild(requestDiv);

    });
}


// =========================
// ACCEPT REQUEST
// =========================

function acceptRequest(index) {

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    requests[index].status = "Accepted";

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    alert("Request accepted!");

    showRequests();
}


// =========================
// REJECT REQUEST
// =========================

function rejectRequest(index) {

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    requests[index].status = "Rejected";

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    alert("Request rejected!");

    showRequests();
}


// =========================
// RUN FUNCTIONS
// =========================

loadBooks();

showRequests();
// =========================
// CHAT
// =========================

function sendMessage() {

    const messageInput =
        document.getElementById("messageInput");

    const message =
        messageInput.value;

    if (message === "") {

        alert("Please enter a message.");

        return;
    }

    let messages =
        JSON.parse(localStorage.getItem("messages")) || [];

    messages.push(message);

    localStorage.setItem(
        "messages",
        JSON.stringify(messages)
    );

    messageInput.value = "";

    loadMessages();
}


function loadMessages() {

    const chatBox =
        document.getElementById("chatBox");

    if (!chatBox) {
        return;
    }

    const messages =
        JSON.parse(localStorage.getItem("messages")) || [];

    chatBox.innerHTML = "";

    if (messages.length === 0) {

        chatBox.innerHTML =
            "<p>No messages yet.</p>";

        return;
    }

    messages.forEach(function(message) {

        const messageDiv =
            document.createElement("p");

        messageDiv.innerText =
            "You: " + message;

        chatBox.appendChild(messageDiv);

    });
}


loadMessages();
function openChat() {

    window.location.href = "chat.html";

}
function logout() {

    localStorage.removeItem("loggedIn");

    alert("Logged out successfully!");

    window.location.href = "login.html";
}
function loadDashboard() {

    const studentName =
        document.getElementById("studentName");

    if (!studentName) {
        return;
    }

    const name =
        localStorage.getItem("userName");

    studentName.innerText =
        name || "Student";


    const books =
        JSON.parse(localStorage.getItem("books")) || [];

    document.getElementById("bookCount").innerText =
        books.length + " books added";


    const requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    document.getElementById("requestCount").innerText =
        requests.length + " requests";
}

loadDashboard();
function showMyBooks() {

    const myBookList =
        document.getElementById("myBookList");

    if (!myBookList) {
        return;
    }

    const books =
        JSON.parse(localStorage.getItem("books")) || [];

    myBookList.innerHTML = "";

    if (books.length === 0) {

        myBookList.innerHTML =
            "<p>You haven't added any books yet.</p>";

        return;
    }

    books.forEach(function(book, index) {

        const bookDiv =
            document.createElement("div");

        bookDiv.className = "book";

        bookDiv.innerHTML = `
            <h3>${book.title}</h3>

            <p>Author: ${book.author}</p>

            <p>Genre: ${book.genre}</p>

            <button onclick="removeBook(${index})">
                🗑️ Remove Book
            </button>
        `;

        myBookList.appendChild(bookDiv);

    });
}


function removeBook(index) {

    let books =
        JSON.parse(localStorage.getItem("books")) || [];

    books.splice(index, 1);

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

    alert("Book removed successfully!");

    showMyBooks();
}


showMyBooks();