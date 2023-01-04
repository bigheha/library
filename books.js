function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages}, ${read}`;
    }
    this.toggleRead = function () {
        if (this.read === 'read') {
            this.read = 'not read';
        } else if (this.read ==='not read'){
            this.read = 'read';
        }
    }
}

let myLibrary = [];

function addBookToLibrary (title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

const formButton = document.querySelector('#addBook');
const formDiv = document.querySelector('.formDiv');
formButton.addEventListener('click', () => {
    formDiv.classList.remove('hidden');
})


const bookspace = document.querySelector(".bookSpace");


renderBooks();

const form = document.querySelector('#bookAddForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("pages").value,
        document.getElementById("read").value
    );
    console.log(myLibrary);
    formDiv.classList.add('hidden');
    deleteBooks();
    renderBooks();
})


function renderBooks() {
    for (book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-number', myLibrary.indexOf(book));
        
        const title = document.createElement('h2');
        title.innerHTML = book.title;
        card.appendChild(title);
        
        const author = document.createElement('p');
        author.innerHTML = book.author;
        card.appendChild(author);

        const pages = document.createElement('p');
        pages.innerHTML = `${book.pages} pages`;
        card.appendChild(pages);

        const readStatus = document.createElement('p');
        readStatus.className = "status";
        readStatus.innerHTML = book.read;
        card.appendChild(readStatus);
        
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', (event) => {
            event.target.parentElement.remove();
            const index = event.target.parentElement.getAttribute("data-number");
            myLibrary.splice(index, 1);
            const cards = document.querySelectorAll(".card");
            for (const card of cards.keys()) {
                cards[card].setAttribute('data-number', card);
            }            
        })
        card.appendChild(deleteButton);

        const resetButton = document.createElement('button');
        resetButton.innerText = 'reset read';
        resetButton.addEventListener('click', (event) =>{
            const index = event.target.parentElement.getAttribute('data-number');
            myLibrary[index].toggleRead();
            event.target.parentElement.querySelector('.status').innerText = myLibrary[index].read;
        });
        card.appendChild(resetButton);
        bookspace.appendChild(card);
    }
}

function deleteBooks() {
    while(bookspace.firstChild){
        bookspace.removeChild(bookspace.firstChild);
    }
}

