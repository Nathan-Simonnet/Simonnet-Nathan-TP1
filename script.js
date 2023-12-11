const header = document.querySelector('header');
const clearBtn = document.querySelector('.clear-btn');
const cardsContainer = document.querySelector('.cards-container');
const form = document.querySelector('form');
const bookTitle = document.getElementById('book-title');
const bookPriority = document.getElementById('book-priority');
const submit = document.querySelector('input[type="submit"]');
const toHide = document.querySelector('.to-hide');


// Empty array which will store our books
let tasks = [

    // {
    //     title: "Lotr",
    //     priority: "1"

    // },
    // {
    //     title: "Le Hobbit",
    //     priority: "2"

    // },
    // {
    //     title: "Le silmarillon",
    //     priority: "2"

    // },
    // {
    //     title: "Eragon",
    //     priority: "3"

    // },

];

// Every time a book is add or deletd, this function is called, and inject the div name cards-container into the local storage
const storing = function () {
    window.localStorage.list = cardsContainer.innerHTML.trim();
    console.log(window.localStorage.list.length)
}

// Every time the page load, this function is called, and inject our cards into a div name cards-container
const restoring = function () {
    if (window.localStorage.list && window.localStorage.list.length > 0) {
        cardsContainer.innerHTML = window.localStorage.list
        document.querySelectorAll('.card').forEach((c) => {
            c.addEventListener('click', () => {
                c.classList.toggle('checked')
                storing();
            });
        });
    } else {
        toHide.classList.add(("hidden"))
    }
    document.getElementById('test').classList.remove('hidden')
}

// Display every new book in tasks when the form is submit
const cardsDisplayer = function () {

    toHide.classList.remove(("hidden"))

    cardsContainer.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {

        cardsContainer.innerHTML +=
            `
        <div class="card" data-title="${tasks[i].title}">
        <p>Title: ${tasks[i].title}</p>
        <p class="${tasks[i].priority == 1 ? "high" : tasks[i].priority == 2 ? "medium" : "low"}">Priority: ${tasks[i].priority}</p>
        </div>
        `
    }

    // Check = line-through the card texts
    document.querySelectorAll('.card').forEach((c) => {
        c.addEventListener('click', () => {
            c.classList.toggle('checked')
            document.getElementById('test').classList.add('hidden')
            storing();
        });
    });

    storing();
}

// If checked, the card will be remove into the html, and tasks
clearBtn.addEventListener('click', (e) => {
    document.querySelectorAll('.checked').forEach((card) => {
        const dataTitle = card.dataset.title
        tasks = tasks.filter((book) => {
            return book.title !== dataTitle
        })

        card.remove()
        storing()
    });
});

// if the inputs are filled, and enter is pressed, a book is stor in tasks, and the function cardDisplayer is called
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (bookTitle.value && bookPriority.value) {

        tasks.push({
            title: bookTitle.value,
            priority: bookPriority.value,
        })
        cardsDisplayer();
    }
    bookTitle.value = "";
});

// Well, you got it
window.addEventListener('load', () => {
    restoring();
});





































